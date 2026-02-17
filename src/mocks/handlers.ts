import { delay, http, HttpResponse } from 'msw'

import {
  buildRiskEvent,
  CREDIT_EXPOSURE_SECTORS,
  getLiquidityPercentages,
  getPeriodDays,
  getPeriodVolatility,
  getRandom,
  getSegmentProfile,
  MILLION,
  ONE_DAY_MS,
  randomDelay,
  RISK_EVENTS_PAGE_SIZE,
  RISK_EVENTS_TOTAL,
  seededRandom,
  toISODate,
} from './factories/dashboard.factory'

export const handlers = [
  http.get(`/api/kpis`, async ({ request }) => {
    await delay(randomDelay())
    const url = new URL(request.url)
    const segment = url.searchParams.get('segment') || 'All'
    const period = url.searchParams.get('period') || '30d'

    const segmentMultiplier =
      segment === 'Corporate'
        ? 1.45
        : segment === 'SME'
          ? 0.95
          : segment === 'Retail'
            ? 0.72
            : 1

    const getSeed = (label: string) =>
      period.length * segment.length * label.length +
      period.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) +
      segment.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) +
      label.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)

    const getKpiValue = (base: number, range: number, label: string) => {
      const seed = getSeed(label)
      return Math.floor(base + seededRandom(seed) * range)
    }
    const getKpiFloat = (
      base: number,
      range: number,
      label: string,
      decimals = 2,
    ) => {
      const seed = getSeed(label)
      return parseFloat((base + seededRandom(seed) * range).toFixed(decimals))
    }

    const netExposureValue =
      getKpiValue(842300000, 50000000, 'netExposure') * segmentMultiplier
    const netExposurePrevious =
      getKpiValue(842300000, 50000000, 'netExposure-prev') * segmentMultiplier
    const netExposureDelta =
      ((netExposureValue - netExposurePrevious) / netExposurePrevious) * 100
    const netExposureTrend = netExposureDelta >= 0 ? 'up' : 'down'

    const liquidityRatioValue = getKpiValue(128, 10, 'liquidityRatio')
    const liquidityRatioPrevious = getKpiValue(128, 10, 'liquidityRatio-prev')
    const liquidityRatioDelta =
      ((liquidityRatioValue - liquidityRatioPrevious) /
        liquidityRatioPrevious) *
      100
    const liquidityRatioTrend = liquidityRatioDelta >= 0 ? 'up' : 'down'

    const creditRiskIndexValue =
      getKpiFloat(3.42, 0.5, 'creditRiskIndex') * segmentMultiplier
    const creditRiskIndexPrevious =
      getKpiFloat(3.42, 0.5, 'creditRiskIndex-prev') * segmentMultiplier
    const creditRiskIndexDelta =
      ((creditRiskIndexValue - creditRiskIndexPrevious) /
        creditRiskIndexPrevious) *
      100
    const creditRiskIndexTrend = creditRiskIndexDelta >= 0 ? 'up' : 'down'

    const fraudAlertsValue =
      getKpiValue(184, 40, 'fraudAlerts') * segmentMultiplier
    const fraudAlertsPrevious =
      getKpiValue(184, 40, 'fraudAlerts-prev') * segmentMultiplier
    const fraudAlertsDelta =
      ((fraudAlertsValue - fraudAlertsPrevious) / fraudAlertsPrevious) * 100
    const fraudAlertsTrend = fraudAlertsDelta >= 0 ? 'up' : 'down'

    const portfolioPerformanceValue = getKpiFloat(
      7.8,
      1.5,
      'portfolioPerformance',
      1,
    )
    const portfolioPerformancePrevious = getKpiFloat(
      7.8,
      1.5,
      'portfolioPerformance-prev',
      1,
    )
    const portfolioPerformanceDelta =
      ((portfolioPerformanceValue - portfolioPerformancePrevious) /
        portfolioPerformancePrevious) *
      100
    const portfolioPerformanceTrend =
      portfolioPerformanceDelta >= 0 ? 'up' : 'down'

    return HttpResponse.json([
      {
        id: '1',
        label: 'netExposure',
        value: netExposureValue,
        previousValue: netExposurePrevious,
        delta: netExposureDelta,
        trend: netExposureTrend,
      },
      {
        id: '2',
        label: 'liquidityRatio',
        value: liquidityRatioValue,
        previousValue: liquidityRatioPrevious,
        delta: liquidityRatioDelta,
        trend: liquidityRatioTrend,
      },
      {
        id: '3',
        label: 'creditRiskIndex',
        value: creditRiskIndexValue,
        previousValue: creditRiskIndexPrevious,
        delta: creditRiskIndexDelta,
        trend: creditRiskIndexTrend,
      },
      {
        id: '4',
        label: 'fraudAlerts',
        value: fraudAlertsValue,
        previousValue: fraudAlertsPrevious,
        delta: fraudAlertsDelta,
        trend: fraudAlertsTrend,
      },
      {
        id: '5',
        label: 'portfolioPerformance',
        value: portfolioPerformanceValue,
        previousValue: portfolioPerformancePrevious,
        delta: portfolioPerformanceDelta,
        trend: portfolioPerformanceTrend,
      },
    ])
  }),

  http.get(`/api/portfolio-trend`, async ({ request }) => {
    await delay(randomDelay())
    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '30d'
    const segment = url.searchParams.get('segment') || 'All'

    const days = getPeriodDays(period)
    const segmentProfile = getSegmentProfile(segment)
    const periodVolatility = getPeriodVolatility(period)
    const now = Date.now()

    const points = Array.from({ length: days }).map((_, i) => {
      const daysFromNow = days - i
      return {
        date: toISODate(now - daysFromNow * ONE_DAY_MS),
        exposure:
          (800 + Math.random() * 50 * periodVolatility) *
          segmentProfile.exposureMultiplier,
        riskIndex:
          3 +
          segmentProfile.riskOffset +
          Math.random() * segmentProfile.volatility * periodVolatility,
        performance:
          7 +
          segmentProfile.performanceOffset +
          Math.random() * segmentProfile.volatility * periodVolatility,
      }
    })
    return HttpResponse.json(points)
  }),

  http.get(`/api/liquidity`, async ({ request }) => {
    await delay(randomDelay())
    const url = new URL(request.url)
    const segment = url.searchParams.get('segment') || 'All'

    const v1 =
      segment === 'Retail' || segment === 'All' ? getRandom(420, 50) : 50
    const v2 =
      segment === 'Corporate' || segment === 'All' ? getRandom(370, 50) : 40
    const v3 = segment === 'SME' || segment === 'All' ? getRandom(210, 30) : 30
    const { p1, p2, p3 } = getLiquidityPercentages(v1, v2, v3)

    return HttpResponse.json([
      {
        segment: 'Retail',
        value: Math.floor(v1 * MILLION),
        percentage: p1,
      },
      {
        segment: 'Corporate',
        value: Math.floor(v2 * MILLION),
        percentage: p2,
      },
      {
        segment: 'SME',
        value: Math.floor(v3 * MILLION),
        percentage: p3,
      },
    ])
  }),

  http.get(`/api/credit-exposure`, async ({ request }) => {
    await delay(randomDelay())
    const url = new URL(request.url)
    const segment = url.searchParams.get('segment') || 'All'

    const multiplier = segment === 'Corporate' ? 2 : 1

    const data = CREDIT_EXPOSURE_SECTORS.map((sector) => ({
      sector,
      exposure: Math.floor(getRandom(200, 50) * MILLION * multiplier),
      riskScore: parseFloat((2 + Math.random() * 3).toFixed(1)),
      percentageOfPortfolio: 0,
    }))

    const total = data.reduce((acc, item) => acc + item.exposure, 0)
    return HttpResponse.json(
      data.map((item) => ({
        ...item,
        percentageOfPortfolio: Math.round((item.exposure / total) * 100),
      })),
    )
  }),

  http.get(`/api/fraud-overview`, async ({ request }) => {
    await delay(randomDelay())
    const url = new URL(request.url)
    const segment = url.searchParams.get('segment') || 'All'

    const mod = segment === 'Retail' ? 2.5 : 0.8

    return HttpResponse.json({
      flaggedTransactions: Math.floor(getRandom(1284, 300) * mod),
      underInvestigation: Math.floor(getRandom(312, 100) * mod),
      resolvedLast30d: Math.floor(getRandom(972, 200)),
      fraudRate: parseFloat((0.1 + Math.random() * 0.1 * mod).toFixed(2)),
    })
  }),

  http.get(`/api/risk-events`, async ({ request }) => {
    await delay(randomDelay())
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const segmentFilter = url.searchParams.get('segment') || 'All'
    const riskTypeFilter = url.searchParams.get('riskType') || 'All'
    const startIndex = (page - 1) * RISK_EVENTS_PAGE_SIZE
    const endIndex = startIndex + RISK_EVENTS_PAGE_SIZE
    let totalItems = 0
    const items = []
    const now = Date.now()

    for (let i = 0; i < RISK_EVENTS_TOTAL; i++) {
      const event = buildRiskEvent(i, now)
      const matchSegment =
        segmentFilter === 'All' || event.segment === segmentFilter
      const matchRisk =
        riskTypeFilter === 'All' || event.type === riskTypeFilter

      if (!matchSegment || !matchRisk) {
        continue
      }

      if (totalItems >= startIndex && totalItems < endIndex) {
        items.push(event)
      }

      totalItems++
    }

    return HttpResponse.json({
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / RISK_EVENTS_PAGE_SIZE),
      currentPage: page,
    })
  }),
]
