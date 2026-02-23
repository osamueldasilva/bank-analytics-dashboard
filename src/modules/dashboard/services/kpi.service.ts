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
  ) => dashboardApi.fetchKpiDetailsTable(kpiId, filters, page, pageSize),
}
