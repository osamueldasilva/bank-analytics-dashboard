import {
  CreditExposureSchema,
  DashboardExportSchema,
  FraudOverviewSchema,
  KpiMetricSchema,
  LiquiditySchema,
  PaginatedRiskEventsSchema,
  PortfolioTrendSchema,
} from '@/src/modules/dashboard/schemas/dashboard.schemas'
import { DashboardFilters } from '@/src/modules/dashboard/types/dashboard.filters'

import {
  generateAllRiskEvents,
  generateCreditExposure,
  generateFraudOverview,
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
}
