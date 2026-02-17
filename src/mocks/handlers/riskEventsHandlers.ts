import { delay, http, HttpResponse } from 'msw'

import {
  buildRiskEvent,
  RISK_EVENTS_PAGE_SIZE,
  RISK_EVENTS_TOTAL,
} from '../factories/dashboard.factory'

export const riskEventsHandlers = [
  http.get('/api/risk-events', async ({ request }) => {
    await delay(200)
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
