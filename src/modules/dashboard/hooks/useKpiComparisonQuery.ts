import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { KpiHistoryPoint } from '../schemas/dashboard.schemas'
import { kpiService } from '../services/kpi.service'
import { useDashboardFilters } from './useDashboardFilters'
import { useKpiDetailsFilters } from './useKpiDetailsFilters'

interface KpiComparisonResult {
  current: KpiHistoryPoint | null
  previous: KpiHistoryPoint | null
  currentValue: number | null
  previousValue: number | null
  variationAbsolute: number | null
  variationPercentage: number | null
  bestPoint: KpiHistoryPoint | null
  worstPoint: KpiHistoryPoint | null
  behavior: 'stable' | 'growing' | 'deteriorating' | 'volatile'
}

export const useKpiComparison = (kpiId: string) => {
  const { filters } = useDashboardFilters()
  const { filters: detailFilters } = useKpiDetailsFilters()

  return useQuery<KpiComparisonResult>({
    queryKey: ['kpi', 'comparison', kpiId, filters, detailFilters.granularity],
    queryFn: async () => {
      const [currentArr, previousArr] = await Promise.all([
        kpiService.getDetailsHistory(kpiId, filters, detailFilters.granularity, 0),
        kpiService.getDetailsHistory(kpiId, filters, detailFilters.granularity, 1),
      ])

      const current = currentArr?.at(-1) ?? null
      const previous = previousArr?.at(-1) ?? null

      const currentValue = current?.value ?? null
      const previousValue = previous?.value ?? null

      let variationAbsolute: number | null = null
      let variationPercentage: number | null = null
      if (
        currentValue !== null &&
        previousValue !== null &&
        previousValue !== 0
      ) {
        variationAbsolute = parseFloat((currentValue - previousValue).toFixed(2))
        variationPercentage = parseFloat(
          (((currentValue - previousValue) / previousValue) * 100).toFixed(
            2,
          ),
        )
      }

      const sortedByValue = [...currentArr].sort((a, b) => a.value - b.value)
      const worstPoint = sortedByValue.at(0) ?? null
      const bestPoint = sortedByValue.at(-1) ?? null

      const values = currentArr.map((point) => point.value)
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

      let behavior: KpiComparisonResult['behavior'] = 'stable'
      if (volatilityRatio > 0.25) {
        behavior = 'volatile'
      } else if ((variationPercentage ?? 0) > 1) {
        behavior = 'growing'
      } else if ((variationPercentage ?? 0) < -1) {
        behavior = 'deteriorating'
      }

      return {
        current,
        previous,
        currentValue,
        previousValue,
        variationAbsolute,
        variationPercentage,
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
}
