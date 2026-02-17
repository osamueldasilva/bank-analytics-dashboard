// modules/dashboard/services/dashboard.service.ts

import {
  CreditExposureSchema,
  FraudOverviewSchema,
  KpiMetricSchema,
  LiquiditySchema,
  PaginatedRiskEventsSchema,
  PortfolioTrendSchema,
} from '../schemas/dashboard.schemas'
import { DashboardFilters } from '../types/dashboard.filters'

const createQueryString = (
  filters: DashboardFilters,
  extra?: Record<string, string | number>,
) => {
  const params = new URLSearchParams({
    segment: filters.segment,
    period: filters.period,
    riskType: filters.riskType,
    ...extra,
  })
  return params.toString()
}

export const dashboardService = {
  getKpis: async (filters: DashboardFilters) => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/kpis?${query}`)
    const json = await res.json()
    const parsed = KpiMetricSchema.array().safeParse(json)
    if (!parsed.success) throw new Error('Contrato inválido: KpiMetric')
    return parsed.data
  },

  getPortfolioTrend: async (filters: DashboardFilters) => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/portfolio-trend?${query}`)
    const json = await res.json()
    const parsed = PortfolioTrendSchema.safeParse(json)
    if (!parsed.success) throw new Error('Contrato inválido: PortfolioTrend')
    return parsed.data
  },

  getLiquidity: async (filters: DashboardFilters) => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/liquidity?${query}`)
    const json = await res.json()
    const parsed = LiquiditySchema.safeParse(json)
    if (!parsed.success) throw new Error('Contrato inválido: Liquidity')
    return parsed.data
  },

  getCreditExposure: async (filters: DashboardFilters) => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/credit-exposure?${query}`)
    const json = await res.json()
    const parsed = CreditExposureSchema.safeParse(json)
    if (!parsed.success) throw new Error('Contrato inválido: CreditExposure')
    return parsed.data
  },

  getFraudOverview: async (filters: DashboardFilters) => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/fraud-overview?${query}`)
    const json = await res.json()
    const parsed = FraudOverviewSchema.safeParse(json)
    if (!parsed.success) throw new Error('Contrato inválido: FraudOverview')
    return parsed.data
  },

  getRiskEvents: async (page: number = 1, filters: DashboardFilters) => {
    const query = createQueryString(filters, { page, limit: 10 })
    const res = await fetch(`/api/risk-events?${query}`)
    if (!res.ok) throw new Error('Erro ao buscar dados de eventos de risco')
    const json = await res.json()
    const parsed = PaginatedRiskEventsSchema.safeParse(json)
    if (!parsed.success) throw new Error('Contrato inválido: RiskEvents')
    return parsed.data
  },
}
