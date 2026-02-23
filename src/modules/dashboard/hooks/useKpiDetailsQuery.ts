import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { QUERY_DEFAULTS } from '@/src/constants'
import type { KpiHistoryPoint } from '@/src/types/dashboard.types'

import { kpiService } from '../services/kpi.service'
import { useDashboardFilters } from './useDashboardFilters'
import { useKpiDetailsFilters } from './useKpiDetailsFilters'

export const useKpiDetailsQuery = (kpiId: string) => {
  const { filters } = useDashboardFilters()
  const { filters: detailFilters } = useKpiDetailsFilters()

  return useQuery<KpiHistoryPoint[]>({
    queryKey: ['kpi', 'details', kpiId, filters, detailFilters.granularity],
    queryFn: () =>
      kpiService.getDetailsHistory(
        kpiId,
        filters,
        detailFilters.granularity,
        0,
      ),
    ...QUERY_DEFAULTS,
    placeholderData: keepPreviousData,
  })
}
