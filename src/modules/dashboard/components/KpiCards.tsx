'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { useKpis } from '../hooks/useDashboardQueries'
import {
  formatCurrency,
  mapKpiLabelToDisplay,
} from '../utils/dashboard.transform'

export function KpiCards() {
  const { data: kpis, isLoading, isError, refetch } = useKpis()

  return (
    <QueryBoundary
      data={kpis}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      skeletonCount={5}
      skeletonWrapperClass="grid grid-cols-5 gap-4"
    >
      {(kpis) => (
        <div className="grid grid-cols-10 gap-4">
          {kpis.map((kpi) => (
            <Card
              key={kpi.id}
              className="col-span-2 flex h-32 flex-col justify-center"
            >
              <CardHeader>
                <CardTitle>{mapKpiLabelToDisplay(kpi.label)}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-end gap-2">
                <span className="text-2xl leading-tight font-bold">
                  {kpi.label === 'netExposure'
                    ? formatCurrency(kpi.value)
                    : kpi.value}
                  {['liquidityRatio', 'portfolioPerformance'].includes(
                    kpi.label,
                  )
                    ? '%'
                    : ''}
                </span>
                <span
                  className={`text-md font-semibold ${
                    kpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {kpi.trend === 'up' ? '↑' : '↓'} {Math.abs(kpi.variation)}%
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </QueryBoundary>
  )
}
