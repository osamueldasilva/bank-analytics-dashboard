import { delay, http, HttpResponse } from 'msw'

import {
  buildRiskEvent,
  CREDIT_EXPOSURE_SECTORS,
  getKpiFloat,
  getKpiValue,
  getLiquidityPercentages,
  getPeriodDays,
  getPeriodVolatility,
  getRandom,
  getSegmentProfile,
  MILLION,
  ONE_DAY_MS,
  RISK_EVENTS_TOTAL,
  segmentMultiplier,
  toISODate,
} from '../factories/dashboard.factory'

export const dashboardExportHandlers = [
  http.get('/api/dashboard/export', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const segment = url.searchParams.get('segment') || 'All'
    const period = url.searchParams.get('period') || '30d'
    const riskType = url.searchParams.get('riskType') || 'All'

    const multiplier = segmentMultiplier(segment)

    const netExposureValue =
      getKpiValue(842300000, 50000000, 'netExposure', period, segment) *
      multiplier
    const netExposurePrevious =
      getKpiValue(842300000, 50000000, 'netExposure-prev', period, segment) *
      multiplier
    const netExposureDelta =
      ((netExposureValue - netExposurePrevious) / netExposurePrevious) * 100

    const liquidityRatioValue = getKpiValue(
      128,
      10,
      'liquidityRatio',
      period,
      segment,
    )
    const liquidityRatioPrevious = getKpiValue(
      128,
      10,
      'liquidityRatio-prev',
      period,
      segment,
    )
    const liquidityRatioDelta =
      ((liquidityRatioValue - liquidityRatioPrevious) /
        liquidityRatioPrevious) *
      100

    const creditRiskIndexValue =
      getKpiFloat(3.42, 0.5, 'creditRiskIndex', period, segment) * multiplier
    const creditRiskIndexPrevious =
      getKpiFloat(3.42, 0.5, 'creditRiskIndex-prev', period, segment) *
      multiplier
    const creditRiskIndexDelta =
      ((creditRiskIndexValue - creditRiskIndexPrevious) /
        creditRiskIndexPrevious) *
      100

    const fraudAlertsValue =
      getKpiValue(184, 40, 'fraudAlerts', period, segment) * multiplier
    const fraudAlertsPrevious =
      getKpiValue(184, 40, 'fraudAlerts-prev', period, segment) * multiplier
    const fraudAlertsDelta =
      ((fraudAlertsValue - fraudAlertsPrevious) / fraudAlertsPrevious) * 100

    const portfolioPerformanceValue = getKpiFloat(
      7.8,
      1.5,
      'portfolioPerformance',
      period,
      segment,
      1,
    )
    const portfolioPerformancePrevious = getKpiFloat(
      7.8,
      1.5,
      'portfolioPerformance-prev',
      period,
      segment,
      1,
    )
    const portfolioPerformanceDelta =
      ((portfolioPerformanceValue - portfolioPerformancePrevious) /
        portfolioPerformancePrevious) *
      100

    const kpis = [
      {
        id: '1',
        label: 'netExposure' as const,
        value: netExposureValue,
        previousValue: netExposurePrevious,
        delta: netExposureDelta,
        trend: netExposureDelta >= 0 ? ('up' as const) : ('down' as const),
      },
      {
        id: '2',
        label: 'liquidityRatio' as const,
        value: liquidityRatioValue,
        previousValue: liquidityRatioPrevious,
        delta: liquidityRatioDelta,
        trend: liquidityRatioDelta >= 0 ? ('up' as const) : ('down' as const),
      },
      {
        id: '3',
        label: 'creditRiskIndex' as const,
        value: creditRiskIndexValue,
        previousValue: creditRiskIndexPrevious,
        delta: creditRiskIndexDelta,
        trend: creditRiskIndexDelta >= 0 ? ('up' as const) : ('down' as const),
      },
      {
        id: '4',
        label: 'fraudAlerts' as const,
        value: fraudAlertsValue,
        previousValue: fraudAlertsPrevious,
        delta: fraudAlertsDelta,
        trend: fraudAlertsDelta >= 0 ? ('up' as const) : ('down' as const),
      },
      {
        id: '5',
        label: 'portfolioPerformance' as const,
        value: portfolioPerformanceValue,
        previousValue: portfolioPerformancePrevious,
        delta: portfolioPerformanceDelta,
        trend:
          portfolioPerformanceDelta >= 0 ? ('up' as const) : ('down' as const),
      },
    ]

    const days = getPeriodDays(period)
    const segmentProfile = getSegmentProfile(segment)
    const periodVolatility = getPeriodVolatility(period)
    const now = Date.now()

    const portfolioTrend = Array.from({ length: days }).map((_, i) => {
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

    const v1 =
      segment === 'Retail' || segment === 'All' ? getRandom(420, 50) : 50
    const v2 =
      segment === 'Corporate' || segment === 'All' ? getRandom(370, 50) : 40
    const v3 = segment === 'SME' || segment === 'All' ? getRandom(210, 30) : 30
    const { p1, p2, p3 } = getLiquidityPercentages(v1, v2, v3)

    const liquidity = [
      {
        segment: 'Retail' as const,
        value: Math.floor(v1 * MILLION),
        percentage: p1,
      },
      {
        segment: 'Corporate' as const,
        value: Math.floor(v2 * MILLION),
        percentage: p2,
      },
      {
        segment: 'SME' as const,
        value: Math.floor(v3 * MILLION),
        percentage: p3,
      },
    ]

    const creditMultiplier = segment === 'Corporate' ? 2 : 1
    const creditData = CREDIT_EXPOSURE_SECTORS.map((sector) => ({
      sector,
      exposure: Math.floor(getRandom(200, 50) * MILLION * creditMultiplier),
      riskScore: parseFloat((2 + Math.random() * 3).toFixed(1)),
      percentageOfPortfolio: 0,
    }))
    const creditTotal = creditData.reduce((acc, item) => acc + item.exposure, 0)
    const creditExposure = creditData.map((item) => ({
      ...item,
      percentageOfPortfolio: Math.round((item.exposure / creditTotal) * 100),
    }))

    const fraudMod = segment === 'Retail' ? 2.5 : 0.8
    const fraudOverview = {
      flaggedTransactions: Math.floor(getRandom(1284, 300) * fraudMod),
      underInvestigation: Math.floor(getRandom(312, 100) * fraudMod),
      resolvedLast30d: Math.floor(getRandom(972, 200)),
      fraudRate: parseFloat((0.1 + Math.random() * 0.1 * fraudMod).toFixed(2)),
    }

    const riskEvents = []
    for (let i = 0; i < RISK_EVENTS_TOTAL; i++) {
      const event = buildRiskEvent(i, now)
      const matchSegment = segment === 'All' || event.segment === segment
      const matchRisk = riskType === 'All' || event.type === riskType
      if (matchSegment && matchRisk) {
        riskEvents.push(event)
      }
    }

    return HttpResponse.json({
      kpis,
      portfolioTrend,
      liquidity,
      creditExposure,
      fraudOverview,
      riskEvents,
    })
  }),
]
