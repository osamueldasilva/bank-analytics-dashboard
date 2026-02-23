import {
  CURRENCY_CODE,
  CURRENCY_LOCALE,
  PERIOD_DAYS_MAP,
} from '@/src/constants'
import type { KpiMetric } from '@/src/types/dashboard.types'

/** Mapeamento de label de KPI para nome de exibição. */
const KPI_LABEL_DISPLAY_MAP: Record<KpiMetric['label'], string> = {
  netExposure: 'Net Exposure',
  liquidityRatio: 'Liquidity Ratio',
  creditRiskIndex: 'Credit Risk Index',
  fraudAlerts: 'Fraud Alerts (30d)',
  portfolioPerformance: 'Portfolio Performance',
}

export const mapKpiLabelToDisplay = (label: KpiMetric['label']): string =>
  KPI_LABEL_DISPLAY_MAP[label] ?? label

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY_CODE,
    notation: 'compact',
  }).format(value)

/**
 * Derives the previous period equivalent to the current one.
 * @param period - string like '7d', '30d', '90d'
 * @param currentStart - Start date of the current period
 * @returns { previousStart, previousEnd }
 */
export function getPreviousPeriod(period: string, currentStart: Date, _: Date) {
  const periodMap = PERIOD_DAYS_MAP
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
