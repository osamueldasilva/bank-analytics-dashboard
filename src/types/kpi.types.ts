import type { KpiMetric } from '@/src/modules/dashboard/schemas/dashboard.schemas'

export type KpiUnitType = 'currency' | 'percentage' | 'number' | 'score'
export type KpiValueType = 'currency' | 'percentage' | 'number' | 'score'
export type KpiColumnType =
  | 'date'
  | 'currency'
  | 'percentage'
  | 'number'
  | 'score'
  | 'string'
  | 'status'

export type KpiGranularity = 'daily' | 'weekly' | 'monthly'
export type KpiSortField =
  | 'date'
  | 'segment'
  | 'value'
  | 'normalizedValue'
  | 'delta'
  | 'status'
export type SortOrder = 'none' | 'asc' | 'desc'
export type KpiCategory = 'All' | 'Core' | 'Watchlist' | 'Strategic'
export type KpiStatus = 'All' | 'Open' | 'Monitoring' | 'Closed'
export type KpiBehavior = 'stable' | 'growing' | 'deteriorating' | 'volatile'

export interface KpiTableColumn {
  key: string
  label: string
  type: KpiColumnType
  sortable?: boolean
}

export interface KpiAdditionalFilter {
  key: 'category' | 'status'
  label: string
  options: string[]
}

export interface KpiRegistryItem {
  id: KpiMetric['label']
  label: string
  unit: KpiUnitType
  type: KpiValueType
  history: {
    endpoint: string
    supportsGranularity: boolean
    supportedGranularities: KpiGranularity[]
  }
  detail: {
    endpoint: string
    columns: KpiTableColumn[]
  }
  comparison: {
    enabled: boolean
  }
  additionalFilters: KpiAdditionalFilter[]
}

export interface KpiNormalizedHistoryPoint {
  period: string
  value: number
  previousValue: number
}

export interface KpiComparisonData {
  current: number
  previous: number
  variationAbsolute: number
  variationPercent: number
  bestPoint: number
  worstPoint: number
  behavior: KpiBehavior
}

export interface KpiTableData {
  rows: Record<string, unknown>[]
  total: number
  totalPages: number
  currentPage: number
}
