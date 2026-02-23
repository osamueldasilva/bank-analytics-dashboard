import {
  KpiDetailsResponse,
  KpiHistoryPoint,
} from '@/src/modules/dashboard/schemas/dashboard.schemas'
import { KpiDetailsFilters } from '@/src/modules/dashboard/schemas/kpiDetailsFilters.schema'

export type QueryState<T> = {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  isFetching: boolean
  refetch: () => unknown
}

export type KpiComparisonData = {
  current: KpiHistoryPoint | null
  previous: KpiHistoryPoint | null
  variationPercentage: number | null
}

export type KpiDetailsFiltersUpdater = (
  filters: Partial<KpiDetailsFilters>,
) => void

export type KpiHistoryQueryState = QueryState<KpiHistoryPoint[]>
export type KpiComparisonQueryState = QueryState<KpiComparisonData>
export type KpiDetailsTableQueryState = QueryState<KpiDetailsResponse>
