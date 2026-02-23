import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { QUERY_DEFAULTS } from '@/src/constants'
import type { KpiHistoryPoint } from '@/src/types/dashboard.types'
import type { KpiComparisonData } from '@/src/types/kpi.types'

import { kpiService } from '../services/kpi.service'
import { calculateKpiComparison } from '../utils/kpi.comparison'
import { useDashboardFilters } from './useDashboardFilters'
import { useKpiDetailsFilters } from './useKpiDetailsFilters'

export interface KpiComparisonResult extends KpiComparisonData {
  currentPoint: KpiHistoryPoint | null
  previousPoint: KpiHistoryPoint | null
  bestHistoryPoint: KpiHistoryPoint | null
  worstHistoryPoint: KpiHistoryPoint | null
}

export const useKpiComparison = (kpiId: string) => {
  const { filters } = useDashboardFilters()
  const { filters: detailFilters } = useKpiDetailsFilters()

  return useQuery<KpiComparisonResult>({
    queryKey: ['kpi', 'comparison', kpiId, filters, detailFilters.granularity],
    queryFn: async () => {
      const [currentArr, previousArr] = await Promise.all([
        kpiService.getDetailsHistory(
          kpiId,
          filters,
          detailFilters.granularity,
          0,
        ),
        kpiService.getDetailsHistory(
          kpiId,
          filters,
          detailFilters.granularity,
          1,
        ),
      ])

      const base = calculateKpiComparison({
        currentPoints: currentArr,
        previousPoints: previousArr,
      })

      const sortedByValue = [...currentArr].sort((a, b) => a.value - b.value)

      return {
        ...base,
        currentPoint: currentArr.at(-1) ?? null,
        previousPoint: previousArr.at(-1) ?? null,
        bestHistoryPoint: sortedByValue.at(-1) ?? null,
        worstHistoryPoint: sortedByValue.at(0) ?? null,
      }
    },
    ...QUERY_DEFAULTS,
    placeholderData: keepPreviousData,
  })
}
