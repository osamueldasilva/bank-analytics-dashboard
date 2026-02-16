import {
  CreditExposureSector,
  FraudOverview,
  KpiMetric,
  LiquiditySegment,
  PortfolioTrendPoint,
  RiskEvent,
} from '../types/dashboard.types'

const API_BASE = 'http://localhost:3000/api'

export const dashboardService = {
  getKpis: async (): Promise<KpiMetric[]> => {
    const res = await fetch(`${API_BASE}/kpis`)
    return res.json()
  },
  getPortfolioTrend: async (): Promise<PortfolioTrendPoint[]> => {
    const res = await fetch(`${API_BASE}/portfolio-trend`)
    return res.json()
  },
  getLiquidity: async (): Promise<LiquiditySegment[]> => {
    const res = await fetch(`${API_BASE}/liquidity`)
    return res.json()
  },
  getCreditExposure: async (): Promise<CreditExposureSector[]> => {
    const res = await fetch(`${API_BASE}/credit-exposure`)
    return res.json()
  },
  getFraudOverview: async (): Promise<FraudOverview> => {
    const res = await fetch(`${API_BASE}/fraud-overview`)
    return res.json()
  },
  getRiskEvents: async (): Promise<RiskEvent[]> => {
    const res = await fetch(`${API_BASE}/risk-events`)
    return res.json()
  },
}
