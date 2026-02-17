import { delay, http, HttpResponse } from 'msw'

import {
  getKpiFloat,
  getKpiValue,
  segmentMultiplier,
} from '../factories/dashboard.factory'

export const kpiHandlers = [
  http.get('/api/kpis', async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const segment = url.searchParams.get('segment') || 'All'
    const period = url.searchParams.get('period') || '30d'

    const multiplier = segmentMultiplier(segment)

    const netExposureValue =
      getKpiValue(842300000, 50000000, 'netExposure', period, segment) *
      multiplier
    const netExposurePrevious =
      getKpiValue(842300000, 50000000, 'netExposure-prev', period, segment) *
      multiplier
    const netExposureDelta =
      ((netExposureValue - netExposurePrevious) / netExposurePrevious) * 100
    const netExposureTrend = netExposureDelta >= 0 ? 'up' : 'down'

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
    const liquidityRatioTrend = liquidityRatioDelta >= 0 ? 'up' : 'down'

    const creditRiskIndexValue =
      getKpiFloat(3.42, 0.5, 'creditRiskIndex', period, segment) * multiplier
    const creditRiskIndexPrevious =
      getKpiFloat(3.42, 0.5, 'creditRiskIndex-prev', period, segment) *
      multiplier
    const creditRiskIndexDelta =
      ((creditRiskIndexValue - creditRiskIndexPrevious) /
        creditRiskIndexPrevious) *
      100
    const creditRiskIndexTrend = creditRiskIndexDelta >= 0 ? 'up' : 'down'

    const fraudAlertsValue =
      getKpiValue(184, 40, 'fraudAlerts', period, segment) * multiplier
    const fraudAlertsPrevious =
      getKpiValue(184, 40, 'fraudAlerts-prev', period, segment) * multiplier
    const fraudAlertsDelta =
      ((fraudAlertsValue - fraudAlertsPrevious) / fraudAlertsPrevious) * 100
    const fraudAlertsTrend = fraudAlertsDelta >= 0 ? 'up' : 'down'

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
]
