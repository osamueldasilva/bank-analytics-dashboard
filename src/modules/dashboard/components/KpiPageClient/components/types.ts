import type { KpiDetailsFilters } from '@/src/modules/dashboard/schemas/kpiDetailsFilters.schema'
import type {
  KpiAdditionalFilter,
  KpiComparisonData,
  KpiNormalizedHistoryPoint,
  KpiTableColumn,
  KpiTableData,
} from '@/src/types/kpi.types'

export type QueryState<T> = {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  isFetching: boolean
  refetch: () => unknown
}

export type KpiDetailsFiltersUpdater = (
  filters: Partial<KpiDetailsFilters>,
) => void

export type KpiHistoryQueryState = QueryState<KpiNormalizedHistoryPoint[]>
export type KpiComparisonQueryState = QueryState<KpiComparisonData>
export type KpiDetailsTableQueryState = QueryState<KpiTableData>

export type KpiTableColumnConfig = KpiTableColumn
export type KpiAdditionalFilterConfig = KpiAdditionalFilter
