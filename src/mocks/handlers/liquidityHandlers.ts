import { delay, http, HttpResponse } from 'msw'

import {
  getLiquidityPercentages,
  getRandom,
  MILLION,
} from '../factories/dashboard.factory'

export const liquidityHandlers = [
  http.get('/api/liquidity', async ({ request }) => {
    await delay(200)
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
]
