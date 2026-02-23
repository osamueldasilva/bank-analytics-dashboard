import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getKpiRegistryItem } from '../config/kpiRegistry'
import { kpiService } from '../services/kpi.service'
import { useDashboardFilters } from './useDashboardFilters'
import { useKpiDetailsFilters } from './useKpiDetailsFilters'

type NormalizedHistoryPoint = {
  period: string
  value: number
  previousValue: number
}

type NormalizedComparison = {
  current: number
  previous: number
  variationAbsolute: number
  variationPercent: number
  bestPoint: number
  worstPoint: number
  behavior: 'stable' | 'growing' | 'deteriorating' | 'volatile'
}

type NormalizedTable = {
  rows: Record<string, unknown>[]
  total: number
  totalPages: number
  currentPage: number
}

export function useKpiDetail(kpiId: string) {
  const meta = getKpiRegistryItem(kpiId)
  const { filters: dashboardFilters } = useDashboardFilters()
  const { filters: detailFilters, updateFilters } = useKpiDetailsFilters()

  const history = useQuery<NormalizedHistoryPoint[]>({
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
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })

  const comparison = useQuery<NormalizedComparison>({
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

      const current = currentArr.at(-1)?.value ?? 0
      const previous = previousArr.at(-1)?.value ?? 0
      const variationAbsolute = parseFloat((current - previous).toFixed(2))
      const variationPercent =
        previous !== 0
          ? parseFloat((((current - previous) / previous) * 100).toFixed(2))
          : 0

      const values = currentArr.map((item) => item.value)
      const bestPoint = values.length ? Math.max(...values) : 0
      const worstPoint = values.length ? Math.min(...values) : 0

      const mean =
        values.length > 0
          ? values.reduce((acc, value) => acc + value, 0) / values.length
          : 0
      const variance =
        values.length > 0
          ? values.reduce((acc, value) => acc + (value - mean) ** 2, 0) /
            values.length
          : 0
      const stdDev = Math.sqrt(variance)
      const volatilityRatio = mean !== 0 ? stdDev / mean : 0

      let behavior: NormalizedComparison['behavior'] = 'stable'
      if (volatilityRatio > 0.25) {
        behavior = 'volatile'
      } else if (variationPercent > 1) {
        behavior = 'growing'
      } else if (variationPercent < -1) {
        behavior = 'deteriorating'
      }

      return {
        current,
        previous,
        variationAbsolute,
        variationPercent,
        bestPoint,
        worstPoint,
        behavior,
      }
    },
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })

  const table = useQuery<NormalizedTable>({
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
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
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
