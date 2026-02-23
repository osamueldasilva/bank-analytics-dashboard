import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { QUERY_DEFAULTS_SLOW } from '@/src/constants'
import type { KpiDetailsResponse } from '@/src/types/dashboard.types'

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
      detailFilters.sortBy,
      detailFilters.sortOrder,
      detailFilters.category,
      detailFilters.status,
    ],
    queryFn: () =>
      kpiService.getDetailsTable(
        kpiId,
        filters,
        detailFilters.page,
        detailFilters.pageSize,
        detailFilters.sortBy,
        detailFilters.sortOrder,
        detailFilters.category,
        detailFilters.status,
      ),
    ...QUERY_DEFAULTS_SLOW,
    placeholderData: keepPreviousData,
  })
}
