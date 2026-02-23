import { useQuery } from '@tanstack/react-query'

import { QUERY_DEFAULTS } from '@/src/constants'

import { riskEventsService } from '../services/riskEvents.service'
import type { RiskEventsFilters } from '../types/riskEvents.types'

export function useRiskEventsQuery(filters: RiskEventsFilters) {
  return useQuery({
    queryKey: ['risk-events', filters],
    queryFn: () => riskEventsService.getRiskEvents(filters),
    ...QUERY_DEFAULTS,
  })
}
