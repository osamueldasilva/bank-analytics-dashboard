import { delay, http, HttpResponse } from 'msw'

import {
  getPeriodDays,
  getPeriodVolatility,
  getSegmentProfile,
  ONE_DAY_MS,
  toISODate,
} from '../factories/dashboard.factory'

export const portfolioTrendHandlers = [
  http.get('/api/portfolio-trend', async ({ request }) => {
    await delay(200)
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
]
