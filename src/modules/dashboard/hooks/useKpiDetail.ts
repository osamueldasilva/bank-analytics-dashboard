import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { QUERY_DEFAULTS, QUERY_DEFAULTS_SLOW } from '@/src/constants'
import type {
  KpiComparisonData,
  KpiNormalizedHistoryPoint,
  KpiTableData,
} from '@/src/types/kpi.types'

import { getKpiRegistryItem } from '../config/kpiRegistry'
import { kpiService } from '../services/kpi.service'
import { calculateKpiComparison } from '../utils/kpi.comparison'
import { useDashboardFilters } from './useDashboardFilters'
import { useKpiDetailsFilters } from './useKpiDetailsFilters'

export function useKpiDetail(kpiId: string) {
  const meta = getKpiRegistryItem(kpiId)
  const { filters: dashboardFilters } = useDashboardFilters()
  const { filters: detailFilters, updateFilters } = useKpiDetailsFilters()

  const history = useQuery<KpiNormalizedHistoryPoint[]>({
    queryKey: [
      'kpi-detail',
      'history',
      kpiId,
      dashboardFilters,
      detailFilters.granularity,
    ],
    enabled: !!meta,
    queryFn: async () => {
      const data = await kpiService.getDetailsHistory(
        kpiId,
        dashboardFilters,
        detailFilters.granularity,
        0,
      )
      return data.map((item) => ({
        period: item.date,
        value: item.value,
        previousValue: item.previousValue,
      }))
    },
    ...QUERY_DEFAULTS,
    placeholderData: keepPreviousData,
  })

  const comparison = useQuery<KpiComparisonData>({
    queryKey: [
      'kpi-detail',
      'comparison',
      kpiId,
      dashboardFilters,
      detailFilters.granularity,
    ],
    enabled: !!meta && meta.comparison.enabled,
    queryFn: async () => {
      const [currentArr, previousArr] = await Promise.all([
        kpiService.getDetailsHistory(
          kpiId,
          dashboardFilters,
          detailFilters.granularity,
          0,
        ),
        kpiService.getDetailsHistory(
          kpiId,
          dashboardFilters,
          detailFilters.granularity,
          1,
        ),
      ])

      return calculateKpiComparison({
        currentPoints: currentArr,
        previousPoints: previousArr,
      })
    },
    ...QUERY_DEFAULTS,
    placeholderData: keepPreviousData,
  })

  const table = useQuery<KpiTableData>({
    queryKey: [
      'kpi-detail',
      'table',
      kpiId,
      dashboardFilters,
      detailFilters.page,
      detailFilters.pageSize,
      detailFilters.sortBy,
      detailFilters.sortOrder,
      detailFilters.category,
      detailFilters.status,
    ],
    enabled: !!meta,
    queryFn: async () => {
      const data = await kpiService.getDetailsTable(
        kpiId,
        dashboardFilters,
        detailFilters.page,
        detailFilters.pageSize,
        detailFilters.sortBy,
        detailFilters.sortOrder,
        detailFilters.category,
        detailFilters.status,
      )

      return {
        rows: data.items as unknown as Record<string, unknown>[],
        total: data.totalItems,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      }
    },
    ...QUERY_DEFAULTS_SLOW,
    placeholderData: keepPreviousData,
  })

  const loading = useMemo(
    () => history.isLoading || comparison.isLoading || table.isLoading,
    [comparison.isLoading, history.isLoading, table.isLoading],
  )

  return {
    meta,
    filters: detailFilters,
    updateFilters,
    history,
    comparison,
    table,
    loading,
  }
}
