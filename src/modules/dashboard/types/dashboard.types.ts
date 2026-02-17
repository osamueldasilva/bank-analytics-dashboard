export type TrendStatus = 'up' | 'down'
export type RiskStatus = 'Open' | 'Monitoring' | 'Closed'
export type RiskType = 'Credit' | 'Fraud' | 'Liquidity'
export type BusinessSegment = 'Retail' | 'Corporate' | 'SME'

export interface KpiMetric {
  id: string;
  label:
    | 'netExposure'
    | 'liquidityRatio'
    | 'creditRiskIndex'
    | 'fraudAlerts'
    | 'portfolioPerformance';
  value: number;
  previousValue: number;
  delta: number;
  trend: TrendStatus;
}

export interface PortfolioTrendPoint {
  date: string
  exposure: number
  riskIndex: number
  performance: number
}

export interface LiquiditySegment {
  segment: BusinessSegment
  value: number
  percentage: number
}

export interface CreditExposureSector {
  sector: 'Real Estate' | 'Energy' | 'Technology' | 'Healthcare'
  exposure: number
  riskScore: number
  percentageOfPortfolio: number
}

export interface FraudOverview {
  flaggedTransactions: number
  underInvestigation: number
  resolvedLast30d: number
  fraudRate: number
}

export interface RiskEvent {
  id: string
  type: RiskType
  segment: BusinessSegment
  exposure: number
  status: RiskStatus
  date: string
}

export interface RiskEventsResponse {
  items: RiskEvent[]
  totalItems: number
  totalPages: number
  currentPage: number
}
