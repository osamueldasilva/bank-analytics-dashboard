export type {
  CreditExposureSector,
  DashboardExportData,
  FraudOverview,
  KpiDetailRow,
  KpiDetailsResponse,
  KpiHistoryPoint,
  KpiMetric,
  LiquiditySegment,
  PortfolioTrendPoint,
  RiskEvent,
  RiskEventsResponse,
} from '@/src/modules/dashboard/schemas/dashboard.schemas'

export type TrendStatus = 'up' | 'down'
export type RiskStatus = 'Open' | 'Monitoring' | 'Closed'
export type RiskType = 'Credit' | 'Fraud' | 'Liquidity'
export type BusinessSegment = 'Retail' | 'Corporate' | 'SME'
