'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { useKpis } from '../hooks/useDashboardQueries'
import {
  formatCurrency,
  mapKpiLabelToDisplay,
} from '../utils/dashboard.transform'

export function KpiCards() {
  const { data: kpis, isLoading, isError, refetch, isFetching } = useKpis()

  return (
    <Card className="gap-0 border-none bg-transparent p-0 shadow-none">
      <QueryBoundary
        data={kpis}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        onRetry={() => refetch()}
        skeleton={{ count: 5 }}
        className={{ loading: 'grid h-24 grid-cols-5 gap-4' }}
      >
        {(data) => (
          <CardContent className="p-0">
            <div className="grid grid-cols-10 gap-4">
              {data.map((item) => (
                <Card
                  key={item.id}
                  className="col-span-2 flex h-32 flex-col justify-center"
                >
                  <CardHeader>
                    <CardTitle className="text-muted-foreground text-sm font-medium uppercase">
                      {mapKpiLabelToDisplay(item.label)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-start gap-1">
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
                      className={`text-md flex items-center gap-1 font-semibold ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
                    >
                      {item.trend === 'up' ? '↑' : '↓'}
                      {Math.abs(item.delta).toFixed(2)}%
                      <span className="text-muted-foreground ml-1 text-xs">
                        vs previous period
                      </span>
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        )}
      </QueryBoundary>
    </Card>
  )
}
