import { KpiMetric } from '../types/dashboard.types'

export const mapKpiLabelToDisplay = (label: KpiMetric['label']): string => {
  const mapping: Record<string, string> = {
    netExposure: 'Net Exposure',
    liquidityRatio: 'Liquidity Ratio',
    creditRiskIndex: 'Credit Risk Index',
    fraudAlerts: 'Fraud Alerts (30d)',
    portfolioPerformance: 'Portfolio Performance',
  }
  return mapping[label] || label
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(value)
}
