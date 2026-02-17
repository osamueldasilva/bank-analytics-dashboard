import { KpiMetric } from '../schemas/dashboard.schemas'

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

/**
 * Derives the previous period equivalent to the current one.
 * @param period - string like '7d', '30d', '90d'
 * @param currentStart - Start date of the current period
 * @param currentEnd - End date of the current period
 * @returns { previousStart, previousEnd }
 */
export function getPreviousPeriod(period: string, currentStart: Date, _: Date) {
  const periodMap: Record<string, number> = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
  }
  const days = periodMap[period]
  if (!days) throw new Error('Invalid period')

  const previousEnd = new Date(currentStart)
  previousEnd.setDate(previousEnd.getDate() - 1)

  const previousStart = new Date(previousEnd)
  previousStart.setDate(previousStart.getDate() - (days - 1))

  return {
    previousStart,
    previousEnd,
  }
}
