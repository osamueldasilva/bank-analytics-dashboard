export type DashboardFilters = {
  segment: 'Retail' | 'Corporate' | 'SME' | 'All'
  period: '7d' | '30d' | '90d'
  riskType: 'All' | 'Credit' | 'Fraud' | 'Liquidity'
}
