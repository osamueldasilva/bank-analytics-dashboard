import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { KpiDetailsResponse } from '../schemas/dashboard.schemas'
import { kpiService } from '../services/kpi.service'
import { useDashboardFilters } from './useDashboardFilters'
import { useKpiDetailsFilters } from './useKpiDetailsFilters'

export const useKpiDetailsTable = (kpiId: string) => {
  const { filters } = useDashboardFilters()
  const { filters: detailFilters } = useKpiDetailsFilters()

  return useQuery<KpiDetailsResponse>({
    queryKey: [
      'kpi',
      'details-table',
      kpiId,
      filters,
      detailFilters.page,
      detailFilters.pageSize,
    ],
    queryFn: () =>
      kpiService.getDetailsTable(
        kpiId,
        filters,
        detailFilters.page,
        detailFilters.pageSize,
      ),
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}
