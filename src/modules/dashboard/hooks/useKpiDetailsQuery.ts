import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { KpiHistoryPoint } from '../schemas/dashboard.schemas'
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
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}
