import type { KpiMetric } from '@/src/types/dashboard.types'
import type { KpiRegistryItem, KpiTableColumn } from '@/src/types/kpi.types'

const baseColumns: KpiTableColumn[] = [
  { key: 'date', label: 'Date', type: 'date', sortable: true },
  { key: 'segment', label: 'Segment', type: 'string', sortable: true },
  { key: 'value', label: 'Gross Value', type: 'currency', sortable: true },
  {
    key: 'normalizedValue',
    label: 'Normalized',
    type: 'number',
    sortable: true,
  },
  { key: 'delta', label: 'Variation', type: 'percentage', sortable: true },
  { key: 'status', label: 'Status', type: 'status', sortable: true },
]

export const kpiRegistry: Record<KpiMetric['label'], KpiRegistryItem> = {
  netExposure: {
    id: 'netExposure',
    label: 'Net Exposure',
    unit: 'currency',
    type: 'currency',
    history: {
      endpoint: '/analytics/net-exposure/history',
      supportsGranularity: true,
      supportedGranularities: ['daily', 'weekly', 'monthly'],
    },
    detail: {
      endpoint: '/analytics/net-exposure/details',
      columns: baseColumns,
    },
    comparison: { enabled: true },
    additionalFilters: [
      {
        key: 'category',
        label: 'Category',
        options: ['All', 'Core', 'Watchlist', 'Strategic'],
      },
      {
        key: 'status',
        label: 'Status',
        options: ['All', 'Open', 'Monitoring', 'Closed'],
      },
    ],
  },
  liquidityRatio: {
    id: 'liquidityRatio',
    label: 'Liquidity Ratio',
    unit: 'percentage',
    type: 'percentage',
    history: {
      endpoint: '/analytics/liquidity-ratio/history',
      supportsGranularity: true,
      supportedGranularities: ['daily', 'weekly', 'monthly'],
    },
    detail: {
      endpoint: '/analytics/liquidity-ratio/details',
      columns: baseColumns,
    },
    comparison: { enabled: true },
    additionalFilters: [
      {
        key: 'category',
        label: 'Category',
        options: ['All', 'Core', 'Watchlist', 'Strategic'],
      },
      {
        key: 'status',
        label: 'Status',
        options: ['All', 'Open', 'Monitoring', 'Closed'],
      },
    ],
  },
  creditRiskIndex: {
    id: 'creditRiskIndex',
    label: 'Credit Risk Index',
    unit: 'score',
    type: 'score',
    history: {
      endpoint: '/analytics/credit-risk-index/history',
      supportsGranularity: true,
      supportedGranularities: ['daily', 'weekly', 'monthly'],
    },
    detail: {
      endpoint: '/analytics/credit-risk-index/details',
      columns: baseColumns,
    },
    comparison: { enabled: true },
    additionalFilters: [
      {
        key: 'category',
        label: 'Category',
        options: ['All', 'Core', 'Watchlist', 'Strategic'],
      },
      {
        key: 'status',
        label: 'Status',
        options: ['All', 'Open', 'Monitoring', 'Closed'],
      },
    ],
  },
  fraudAlerts: {
    id: 'fraudAlerts',
    label: 'Fraud Alerts',
    unit: 'number',
    type: 'number',
    history: {
      endpoint: '/analytics/fraud-alerts/history',
      supportsGranularity: true,
      supportedGranularities: ['daily', 'weekly', 'monthly'],
    },
    detail: {
      endpoint: '/analytics/fraud-alerts/details',
      columns: baseColumns,
    },
    comparison: { enabled: true },
    additionalFilters: [
      {
        key: 'category',
        label: 'Category',
        options: ['All', 'Core', 'Watchlist', 'Strategic'],
      },
      {
        key: 'status',
        label: 'Status',
        options: ['All', 'Open', 'Monitoring', 'Closed'],
      },
    ],
  },
  portfolioPerformance: {
    id: 'portfolioPerformance',
    label: 'Portfolio Performance',
    unit: 'percentage',
    type: 'percentage',
    history: {
      endpoint: '/analytics/portfolio-performance/history',
      supportsGranularity: true,
      supportedGranularities: ['daily', 'weekly', 'monthly'],
    },
    detail: {
      endpoint: '/analytics/portfolio-performance/details',
      columns: baseColumns,
    },
    comparison: { enabled: true },
    additionalFilters: [
      {
        key: 'category',
        label: 'Category',
        options: ['All', 'Core', 'Watchlist', 'Strategic'],
      },
      {
        key: 'status',
        label: 'Status',
        options: ['All', 'Open', 'Monitoring', 'Closed'],
      },
    ],
  },
}

export function getKpiRegistryItem(kpiId: string): KpiRegistryItem | null {
  return kpiRegistry[kpiId as KpiMetric['label']] ?? null
}
