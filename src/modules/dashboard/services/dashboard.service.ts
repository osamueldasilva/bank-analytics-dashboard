import { dashboardApi } from '@/src/core/api/dashboard.api'

import { DashboardFilters } from '../types/dashboard.filters'

export const dashboardService = {
  getKpis: (filters: DashboardFilters) => dashboardApi.fetchKpis(filters),

  getPortfolioTrend: (filters: DashboardFilters) =>
    dashboardApi.fetchPortfolioTrend(filters),

  getLiquidity: (filters: DashboardFilters) =>
    dashboardApi.fetchLiquidity(filters),

  getCreditExposure: (filters: DashboardFilters) =>
    dashboardApi.fetchCreditExposure(filters),

  getFraudOverview: (filters: DashboardFilters) =>
    dashboardApi.fetchFraudOverview(filters),

  getRiskEvents: (page: number = 1, filters: DashboardFilters) =>
    dashboardApi.fetchRiskEvents(page, filters),
}
