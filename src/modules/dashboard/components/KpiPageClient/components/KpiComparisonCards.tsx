import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatKpiValueByType } from '@/src/modules/dashboard/utils/kpi.format'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'
import type { KpiValueType } from '@/src/types/kpi.types'

import { KpiComparisonQueryState } from './types'

interface KpiComparisonCardsProps {
  comparison: KpiComparisonQueryState
  valueType: KpiValueType
}

export function KpiComparisonCards({
  comparison,
  valueType,
}: KpiComparisonCardsProps) {
  const behaviorLabelMap = {
    stable: 'Stable',
    growing: 'Growing',
    deteriorating: 'Deteriorating',
    volatile: 'Volatile',
  } as const

  return (
    <QueryBoundary
      data={comparison.data}
      isLoading={comparison.isLoading}
      isError={comparison.isError}
      isFetching={comparison.isFetching}
      onRetry={() => comparison.refetch()}
      skeleton={{ count: 5 }}
      className={{
        loading: 'grid h-24 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5',
      }}
    >
      {(data) => (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium uppercase">
                Current Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-lg font-bold sm:text-2xl">
                {formatKpiValueByType(data.current, valueType)}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium uppercase">
                Variation (Abs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span
                className={`text-lg font-bold sm:text-2xl ${data.variationAbsolute >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
              >
                {data.variationAbsolute >= 0 ? '+' : ''}
                {formatKpiValueByType(
                  Math.abs(data.variationAbsolute),
                  valueType,
                )}
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
                className={`text-lg font-bold sm:text-2xl ${data.variationPercent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
              >
                {data.variationPercent >= 0 ? '↑' : '↓'}
                {Math.abs(data.variationPercent).toFixed(2)}%
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium uppercase">
                Best / Worst
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-semibold text-emerald-500">
                  Best: {formatKpiValueByType(data.bestPoint, valueType)}
                </span>
                <span className="font-semibold text-red-500">
                  Worst: {formatKpiValueByType(data.worstPoint, valueType)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 sm:col-span-1">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium uppercase">
                Behavior
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-lg font-bold sm:text-2xl">
                {behaviorLabelMap[data.behavior]}
              </span>
            </CardContent>
          </Card>
        </div>
      )}
    </QueryBoundary>
  )
}
