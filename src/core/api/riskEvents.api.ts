import {
  RiskEventsFiltersSchema,
  RiskEventsPageResponseSchema,
} from '@/src/modules/risk-events/schemas/riskEvents.schema'

import { generateRiskEventsPage } from './riskEvents.mock'
import { simulateLatency } from './simulateLatency'

export const riskEventsApi = {
  fetchRiskEvents: async (queryString: string) => {
    await simulateLatency(200, 450)

    const params = new URLSearchParams(queryString)
    const parsedFilters = RiskEventsFiltersSchema.safeParse({
      page: params.get('page') ?? undefined,
      pageSize: params.get('pageSize') ?? undefined,
      severity: params.get('severity') ?? undefined,
      status: params.get('status') ?? undefined,
      startDate: params.get('startDate') ?? undefined,
      endDate: params.get('endDate') ?? undefined,
      sort: params.get('sort') ?? undefined,
    })

    const safeFilters = parsedFilters.success
      ? parsedFilters.data
      : RiskEventsFiltersSchema.parse({})

    const data = generateRiskEventsPage(safeFilters)
    const parsedResponse = RiskEventsPageResponseSchema.safeParse(data)

    if (!parsedResponse.success) {
      throw new Error('Contrato inválido: RiskEventsPageResponse')
    }

    return parsedResponse.data
  },
}
