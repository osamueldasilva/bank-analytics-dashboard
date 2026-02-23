import {
  KpiAdditionalFilter,
  KpiTableColumn,
} from '@/src/modules/dashboard/config/kpiRegistry'
import { KpiDetailsFilters } from '@/src/modules/dashboard/schemas/kpiDetailsFilters.schema'

export type QueryState<T> = {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  isFetching: boolean
  refetch: () => unknown
}

export type KpiComparisonData = {
  current: number
  previous: number
  variationAbsolute: number
  variationPercent: number
  bestPoint: number
  worstPoint: number
  behavior: 'stable' | 'growing' | 'deteriorating' | 'volatile'
}

export type KpiHistoryDataPoint = {
  period: string
  value: number
  previousValue: number
}

export type KpiTableData = {
  rows: Record<string, unknown>[]
  total: number
  totalPages: number
  currentPage: number
}

export type KpiDetailsFiltersUpdater = (
  filters: Partial<KpiDetailsFilters>,
) => void

export type KpiHistoryQueryState = QueryState<KpiHistoryDataPoint[]>
export type KpiComparisonQueryState = QueryState<KpiComparisonData>
export type KpiDetailsTableQueryState = QueryState<KpiTableData>

export type KpiTableColumnConfig = KpiTableColumn
export type KpiAdditionalFilterConfig = KpiAdditionalFilter
