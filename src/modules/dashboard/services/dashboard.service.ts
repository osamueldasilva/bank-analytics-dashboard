import {
  CreditExposureSector,
  FraudOverview,
  KpiMetric,
  LiquiditySegment,
  PortfolioTrendPoint,
  RiskEvent,
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
  getRiskEvents: async (): Promise<RiskEvent[]> => {
    const res = await fetch(`/api/risk-events`)
    return res.json()
  },
}
