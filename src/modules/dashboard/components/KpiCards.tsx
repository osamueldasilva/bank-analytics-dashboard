'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildKpiUrl } from '@/lib/buildKpiUrl'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { useKpis } from '../hooks/useDashboardQueries'
import {
  formatCurrency,
  mapKpiLabelToDisplay,
} from '../utils/dashboard.transform'

export function KpiCards() {
  const { data: kpis, isLoading, isError, refetch, isFetching } = useKpis()
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Card className="gap-0 border-none bg-transparent p-0 shadow-none">
      <QueryBoundary
        data={kpis}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        onRetry={() => refetch()}
        skeleton={{ count: 5 }}
        className={{
          loading:
            'grid h-96 grid-cols-1 gap-4 sm:grid-cols-2 lg:h-24 lg:grid-cols-5',
        }}
      >
        {(data) => (
          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {data.map((item) => (
                <Card
                  key={item.id}
                  className="hover:bg-accent flex h-32 cursor-pointer flex-col justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => {
                    router.push(buildKpiUrl(item.label, searchParams))
                  }}
                  title="Click to view details"
                >
                  <CardHeader>
                    <CardTitle className="text-muted-foreground text-sm font-medium uppercase">
                      {mapKpiLabelToDisplay(item.label)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-start gap-1">
                    <span className="text-lg leading-tight font-bold sm:text-2xl">
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
                      className={`text-md flex items-center gap-1 font-semibold ${item.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
                    >
                      {item.trend === 'up' ? '↑' : '↓'}
                      {Math.abs(item.delta).toFixed(2)}%
                      <span className="text-muted-foreground ml-1 text-sm">
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
