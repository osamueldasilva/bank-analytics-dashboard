import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { KpiComparisonQueryState } from './types'

interface KpiComparisonCardsProps {
  comparison: KpiComparisonQueryState
}

export function KpiComparisonCards({ comparison }: KpiComparisonCardsProps) {
  return (
    <QueryBoundary
      data={comparison.data}
      isLoading={comparison.isLoading}
      isError={comparison.isError}
      isFetching={comparison.isFetching}
      onRetry={() => comparison.refetch()}
      skeleton={{ count: 3 }}
      className={{ loading: 'grid h-24 grid-cols-3 gap-4' }}
    >
      {(data) => (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium uppercase">
                Current Period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">
                {data.current?.value?.toFixed(2) ?? '—'}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium uppercase">
                Previous Period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">
                {data.previous?.value?.toFixed(2) ?? '—'}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium uppercase">
                Variation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span
                className={`text-2xl font-bold ${(data.variationPercentage ?? 0) >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}
              >
                {(data.variationPercentage ?? 0) >= 0 ? '↑' : '↓'}
                {Math.abs(data.variationPercentage ?? 0).toFixed(2)}%
              </span>
            </CardContent>
          </Card>
        </div>
      )}
    </QueryBoundary>
  )
}
