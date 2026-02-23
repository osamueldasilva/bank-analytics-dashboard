import { dashboardApi } from '@/src/core/api/dashboard.api'

import { DashboardFilters } from '../types/dashboard.filters'

export const kpiService = {
  getDetailsHistory: (
    kpiId: string,
    filters: DashboardFilters,
    granularity: 'daily' | 'weekly' | 'monthly',
    periodOffset: number = 0,
  ) => dashboardApi.fetchKpiHistory(kpiId, filters, granularity, periodOffset),

  getDetailsTable: (
    kpiId: string,
    filters: DashboardFilters,
    page: number,
    pageSize: number,
    sortBy:
      | 'date'
      | 'segment'
      | 'value'
      | 'normalizedValue'
      | 'delta'
      | 'status',
    sortOrder: 'none' | 'asc' | 'desc',
    category: 'All' | 'Core' | 'Watchlist' | 'Strategic',
    status: 'All' | 'Open' | 'Monitoring' | 'Closed',
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
