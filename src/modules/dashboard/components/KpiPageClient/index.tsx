'use client'

import { useRouter } from 'next/navigation'

import { useKpiComparison } from '../../hooks/useKpiComparisonQuery'
import { useKpiDetailsFilters } from '../../hooks/useKpiDetailsFilters'
import { useKpiDetailsQuery } from '../../hooks/useKpiDetailsQuery'
import { useKpiDetailsTable } from '../../hooks/useKpiDetailsTableQuery'
import { KpiComparisonCards } from './components/KpiComparisonCards'
import { KpiDetailsHeader } from './components/KpiDetailsHeader'
import { KpiDetailsTable } from './components/KpiDetailsTable'
import { KpiGranularityFilter } from './components/KpiGranularityFilter'
import { KpiHistoryChart } from './components/KpiHistoryChart'

export function KpiPageClient({ kpiId }: { kpiId: string }) {
  const router = useRouter()

  const { filters: detailFilters, updateFilters } = useKpiDetailsFilters()

  const history = useKpiDetailsQuery(kpiId)
  const comparison = useKpiComparison(kpiId)
  const detailsTable = useKpiDetailsTable(kpiId)

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <div className="flex justify-between">
        <KpiDetailsHeader kpiId={kpiId} onBack={() => router.back()} />

        <KpiGranularityFilter
          granularity={detailFilters.granularity}
          onChange={(value) => updateFilters({ granularity: value, page: 1 })}
        />
      </div>
      <KpiComparisonCards comparison={comparison} />

      <KpiHistoryChart
        history={history}
        granularity={detailFilters.granularity}
      />

      <KpiDetailsTable
        detailsTable={detailsTable}
        updateFilters={updateFilters}
      />
    </div>
  )
}
