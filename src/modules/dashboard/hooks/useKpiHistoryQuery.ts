import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { KpiHistoryPoint } from '../schemas/dashboard.schemas'
import { dashboardService } from '../services/dashboard.service'
import { useDashboardFilters } from './useDashboardFilters'
import { useKpiDetailsFilters } from './useKpiDetailsFilters'

export const useKpiHistory = (kpiId: string) => {
  const { filters } = useDashboardFilters()
  const { filters: detailFilters } = useKpiDetailsFilters()

  return useQuery<KpiHistoryPoint[]>({
    queryKey: ['kpi', 'history', kpiId, filters, detailFilters.granularity],
    queryFn: () =>
      dashboardService.getKpiHistory(kpiId, filters, detailFilters.granularity),
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}
