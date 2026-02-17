import { delay, http, HttpResponse } from 'msw'

import {
  CREDIT_EXPOSURE_SECTORS,
  getRandom,
  MILLION,
} from '../factories/dashboard.factory'

export const creditExposureHandlers = [
  http.get('/api/credit-exposure', async ({ request }) => {
    await delay(200)
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
]
