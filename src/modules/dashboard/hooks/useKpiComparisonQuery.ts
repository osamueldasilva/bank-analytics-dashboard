import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { KpiHistoryPoint } from '../schemas/dashboard.schemas'
import { kpiService } from '../services/kpi.service'
import { useDashboardFilters } from './useDashboardFilters'

interface KpiComparisonResult {
  current: KpiHistoryPoint | null
  previous: KpiHistoryPoint | null
  variationPercentage: number | null
}

export const useKpiComparison = (kpiId: string) => {
  const { filters } = useDashboardFilters()

  return useQuery<KpiComparisonResult>({
    queryKey: ['kpi', 'comparison', kpiId, filters],
    queryFn: async () => {
      const [currentArr, previousArr] = await Promise.all([
        kpiService.getDetailsHistory(kpiId, filters, 'daily', 0),
        kpiService.getDetailsHistory(kpiId, filters, 'daily', 1),
      ])

      const current = currentArr?.at(-1) ?? null
      const previous = previousArr?.at(-1) ?? null

      let variationPercentage: number | null = null
      if (current && previous && previous.value !== 0) {
        variationPercentage = parseFloat(
          (((current.value - previous.value) / previous.value) * 100).toFixed(
            2,
          ),
        )
      }

      return { current, previous, variationPercentage }
    },
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}
