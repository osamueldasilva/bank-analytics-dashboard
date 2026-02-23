import {
  CreditExposureSchema,
  DashboardExportSchema,
  FraudOverviewSchema,
  KpiHistorySchema,
  KpiMetricSchema,
  LiquiditySchema,
  PaginatedKpiDetailsSchema,
  PaginatedRiskEventsSchema,
  PortfolioTrendSchema,
} from '@/src/modules/dashboard/schemas/dashboard.schemas'
import type { DashboardFilters } from '@/src/modules/dashboard/types/dashboard.filters'
import type { KpiCategory, KpiSortField, KpiStatus, SortOrder } from '@/src/types/kpi.types'

import {
  generateAllRiskEvents,
  generateCreditExposure,
  generateFraudOverview,
  generateKpiDetailsTable,
  generateKpiHistory,
  generateKpis,
  generateLiquidity,
  generatePortfolioTrend,
  generateRiskEvents,
} from './dashboard.mock'
import { simulateLatency } from './simulateLatency'

export const dashboardApi = {
  fetchKpis: async (filters: DashboardFilters) => {
    await simulateLatency()
    const data = generateKpis(filters)
    const parsed = KpiMetricSchema.array().safeParse(data)
    if (!parsed.success) throw new Error('Contrato inválido: KpiMetric')
    return parsed.data
  },

  fetchPortfolioTrend: async (filters: DashboardFilters) => {
    await simulateLatency()
    const data = generatePortfolioTrend(filters)
    const parsed = PortfolioTrendSchema.safeParse(data)
    if (!parsed.success) throw new Error('Contrato inválido: PortfolioTrend')
    return parsed.data
  },

  fetchLiquidity: async (filters: DashboardFilters) => {
    await simulateLatency()
    const data = generateLiquidity(filters)
    const parsed = LiquiditySchema.safeParse(data)
    if (!parsed.success) throw new Error('Contrato inválido: Liquidity')
    return parsed.data
  },

  fetchCreditExposure: async (filters: DashboardFilters) => {
    await simulateLatency()
    const data = generateCreditExposure(filters)
    const parsed = CreditExposureSchema.safeParse(data)
    if (!parsed.success) throw new Error('Contrato inválido: CreditExposure')
    return parsed.data
  },

  fetchFraudOverview: async (filters: DashboardFilters) => {
    await simulateLatency()
    const data = generateFraudOverview(filters)
    const parsed = FraudOverviewSchema.safeParse(data)
    if (!parsed.success) throw new Error('Contrato inválido: FraudOverview')
    return parsed.data
  },

  fetchRiskEvents: async (page: number, filters: DashboardFilters) => {
    await simulateLatency()
    const data = generateRiskEvents(filters, page)
    const parsed = PaginatedRiskEventsSchema.safeParse(data)
    if (!parsed.success) throw new Error('Contrato inválido: RiskEvents')
    return parsed.data
  },

  fetchDashboardExport: async (filters: DashboardFilters) => {
    await simulateLatency(200, 400)
    const data = {
      kpis: generateKpis(filters),
      portfolioTrend: generatePortfolioTrend(filters),
      liquidity: generateLiquidity(filters),
      creditExposure: generateCreditExposure(filters),
      fraudOverview: generateFraudOverview(filters),
      riskEvents: generateAllRiskEvents(filters),
    }
    const parsed = DashboardExportSchema.safeParse(data)
    if (!parsed.success) throw new Error('Contrato inválido: DashboardExport')
    return parsed.data
  },

  fetchKpiHistory: async (
    kpiId: string,
    filters: DashboardFilters,
    granularity: string,
    periodOffset: number = 0,
  ) => {
    await simulateLatency()
    const data = generateKpiHistory(kpiId, filters, granularity, periodOffset)
    const parsed = KpiHistorySchema.safeParse(data)
    if (!parsed.success) throw new Error('Contrato inválido: KpiHistory')
    return parsed.data
  },

  fetchKpiDetailsTable: async (
    kpiId: string,
    filters: DashboardFilters,
    page: number,
    pageSize: number,
    sortBy: KpiSortField,
    sortOrder: SortOrder,
    category: KpiCategory,
    status: KpiStatus,
  ) => {
    await simulateLatency()
    const data = generateKpiDetailsTable(
      kpiId,
      filters,
      page,
      pageSize,
      sortBy,
      sortOrder,
      category,
      status,
    )
    const parsed = PaginatedKpiDetailsSchema.safeParse(data)
    if (!parsed.success) throw new Error('Contrato inválido: KpiDetailsTable')
    return parsed.data
  },
}
