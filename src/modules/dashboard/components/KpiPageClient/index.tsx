'use client'

import { useRouter } from 'next/navigation'

import { useKpiDetail } from '../../hooks/useKpiDetail'
import { KpiComparisonCards } from './components/KpiComparisonCards'
import { KpiDetailsHeader } from './components/KpiDetailsHeader'
import { KpiDetailsTable } from './components/KpiDetailsTable'
import { KpiGranularityFilter } from './components/KpiGranularityFilter'
import { KpiHistoryChart } from './components/KpiHistoryChart'

export function KpiPageClient({ kpiId }: { kpiId: string }) {
  const router = useRouter()
  const kpiDetail = useKpiDetail(kpiId)

  if (!kpiDetail.meta) {
    return null
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <div className="flex justify-between">
        <KpiDetailsHeader
          label={kpiDetail.meta.label}
          onBack={() => router.back()}
          currentValue={kpiDetail.comparison.data?.current}
          variationPercent={kpiDetail.comparison.data?.variationPercent}
          valueType={kpiDetail.meta.type}
        />

        <KpiGranularityFilter
          granularity={kpiDetail.filters.granularity}
          options={kpiDetail.meta.history.supportedGranularities}
          onChange={(value) =>
            kpiDetail.updateFilters({ granularity: value, page: 1 })
          }
        />
      </div>
      <KpiComparisonCards
        comparison={kpiDetail.comparison}
        valueType={kpiDetail.meta.type}
      />

      <KpiHistoryChart
        history={kpiDetail.history}
        granularity={kpiDetail.filters.granularity}
      />

      <KpiDetailsTable
        detailsTable={kpiDetail.table}
        updateFilters={kpiDetail.updateFilters}
        tableFilters={kpiDetail.filters}
        columns={kpiDetail.meta.detail.columns}
        additionalFilters={kpiDetail.meta.additionalFilters}
      />
    </div>
  )
}
