import {
  CreditExposureSector,
  FraudOverview,
  KpiMetric,
  LiquiditySegment,
  PortfolioTrendPoint,
  RiskEventsResponse,
} from '../types/dashboard.types'

export const dashboardService = {
  getKpis: async (): Promise<KpiMetric[]> => {
    const res = await fetch(`/api/kpis`)
    return res.json()
  },
  getPortfolioTrend: async (): Promise<PortfolioTrendPoint[]> => {
    const res = await fetch(`/api/portfolio-trend`)
    return res.json()
  },
  getLiquidity: async (): Promise<LiquiditySegment[]> => {
    const res = await fetch(`/api/liquidity`)
    return res.json()
  },
  getCreditExposure: async (): Promise<CreditExposureSector[]> => {
    const res = await fetch(`/api/credit-exposure`)
    return res.json()
  },
  getFraudOverview: async (): Promise<FraudOverview> => {
    const res = await fetch(`/api/fraud-overview`)
    return res.json()
  },
  getRiskEvents: async (page: number = 1): Promise<RiskEventsResponse> => {
    const res = await fetch(`/api/risk-events?page=${page}&limit=10`)
    if (!res.ok) throw new Error('Erro ao buscar dados')
    return res.json()
  },
}
