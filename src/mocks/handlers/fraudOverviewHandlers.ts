import { delay, http, HttpResponse } from 'msw'

import { getRandom } from '../factories/dashboard.factory'

export const fraudOverviewHandlers = [
  http.get('/api/fraud-overview', async ({ request }) => {
    await delay(200)
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
]
