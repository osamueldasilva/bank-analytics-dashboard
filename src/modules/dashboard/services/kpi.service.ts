import { dashboardApi } from '@/src/core/api/dashboard.api'
import type {
  KpiCategory,
  KpiGranularity,
  KpiSortField,
  KpiStatus,
  SortOrder,
} from '@/src/types/kpi.types'

import type { DashboardFilters } from '../types/dashboard.filters'

export const kpiService = {
  getDetailsHistory: (
    kpiId: string,
    filters: DashboardFilters,
    granularity: KpiGranularity,
    periodOffset: number = 0,
  ) => dashboardApi.fetchKpiHistory(kpiId, filters, granularity, periodOffset),

  getDetailsTable: (
    kpiId: string,
    filters: DashboardFilters,
    page: number,
    pageSize: number,
    sortBy: KpiSortField,
    sortOrder: SortOrder,
    category: KpiCategory,
    status: KpiStatus,
  ) =>
    dashboardApi.fetchKpiDetailsTable(
      kpiId,
      filters,
      page,
      pageSize,
      sortBy,
      sortOrder,
      category,
      status,
    ),
}
