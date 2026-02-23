import { riskEventsApi } from '@/src/core/api/riskEvents.api'

import type { RiskEventsFilters } from '../types/riskEvents.types'

function toQueryString(filters: RiskEventsFilters): string {
  const params = new URLSearchParams()

  params.set('page', String(filters.page))
  params.set('pageSize', String(filters.pageSize))
  params.set('sort', filters.sort)

  if (filters.severity) params.set('severity', filters.severity)
  if (filters.status) params.set('status', filters.status)
  if (filters.startDate) params.set('startDate', filters.startDate)
  if (filters.endDate) params.set('endDate', filters.endDate)

  return params.toString()
}

export const riskEventsService = {
  getRiskEvents: (filters: RiskEventsFilters) => {
    const queryString = toQueryString(filters)
    return riskEventsApi.fetchRiskEvents(queryString)
  },
}
