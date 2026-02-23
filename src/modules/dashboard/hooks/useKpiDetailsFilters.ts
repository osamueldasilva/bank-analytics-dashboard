'use client'

import { kpiDetailsFiltersSchema } from '../schemas/kpiDetailsFilters.schema'
import { useUrlFilters } from './useUrlFilters'

const KPI_DETAILS_FILTER_KEYS = [
  'granularity',
  'page',
  'pageSize',
  'sortBy',
  'sortOrder',
  'category',
  'status',
] as const

export function useKpiDetailsFilters() {
  return useUrlFilters({
    schema: kpiDetailsFiltersSchema,
    keys: KPI_DETAILS_FILTER_KEYS,
  })
}
