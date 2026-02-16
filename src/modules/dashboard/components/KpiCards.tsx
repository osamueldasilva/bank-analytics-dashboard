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
      {(data) => (
        <div className="grid grid-cols-10 gap-4">
          {data.map((item) => (
            <Card
              key={item.id}
              className="col-span-2 flex h-32 flex-col justify-center"
            >
              <CardHeader>
                <CardTitle>{mapKpiLabelToDisplay(item.label)}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-end gap-2">
                <span className="text-2xl leading-tight font-bold">
                  {item.label === 'netExposure'
                    ? formatCurrency(item.value)
                    : item.value}
                  {['liquidityRatio', 'portfolioPerformance'].includes(
                    item.label,
                  )
                    ? '%'
                    : ''}
                </span>
                <span
                  className={`text-md font-semibold ${
                    item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {item.trend === 'up' ? '↑' : '↓'} {Math.abs(item.variation)}%
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </QueryBoundary>
  )
}
