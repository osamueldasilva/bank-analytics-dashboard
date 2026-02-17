// modules/dashboard/services/dashboard.service.ts

import { DashboardFilters } from '../types/dashboard.filters'
import {
  CreditExposureSector,
  FraudOverview,
  KpiMetric,
  LiquiditySegment,
  PortfolioTrendPoint,
  RiskEventsResponse,
} from '../types/dashboard.types'

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
  getKpis: async (filters: DashboardFilters): Promise<KpiMetric[]> => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/kpis?${query}`)
    return res.json()
  },

  getPortfolioTrend: async (
    filters: DashboardFilters,
  ): Promise<PortfolioTrendPoint[]> => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/portfolio-trend?${query}`)
    return res.json()
  },

  getLiquidity: async (
    filters: DashboardFilters,
  ): Promise<LiquiditySegment[]> => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/liquidity?${query}`)
    return res.json()
  },

  getCreditExposure: async (
    filters: DashboardFilters,
  ): Promise<CreditExposureSector[]> => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/credit-exposure?${query}`)
    return res.json()
  },

  getFraudOverview: async (
    filters: DashboardFilters,
  ): Promise<FraudOverview> => {
    const query = createQueryString(filters)
    const res = await fetch(`/api/fraud-overview?${query}`)
    return res.json()
  },

  getRiskEvents: async (
    page: number = 1,
    filters: DashboardFilters,
  ): Promise<RiskEventsResponse> => {
    const query = createQueryString(filters, { page, limit: 10 })
    const res = await fetch(`/api/risk-events?${query}`)

    if (!res.ok) throw new Error('Erro ao buscar dados de eventos de risco')
    return res.json()
  },
}
