import { format } from 'date-fns'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { KpiDetailsFilters } from '@/src/modules/dashboard/schemas/kpiDetailsFilters.schema'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { KpiHistoryQueryState } from './types'

const historyChartConfig = {
  value: {
    label: 'Value',
    color: 'var(--chart-1)',
  },
} as ChartConfig

interface KpiHistoryChartProps {
  history: KpiHistoryQueryState
  granularity: KpiDetailsFilters['granularity']
}

export function KpiHistoryChart({
  history,
  granularity,
}: KpiHistoryChartProps) {
  return (
    <QueryBoundary
      data={history.data}
      isLoading={history.isLoading}
      isError={history.isError}
      isFetching={history.isFetching}
      onRetry={() => history.refetch()}
      skeleton={{ count: 1 }}
      className={{
        error: 'h-74',
        empty: 'h-74',
        loading: 'h-74',
      }}
    >
      {(data) => (
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-1">
              <CardTitle>History Trend</CardTitle>
              <CardDescription>
                {granularity.charAt(0).toUpperCase() + granularity.slice(1)}{' '}
                granularity
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={historyChartConfig} className="h-56 w-full">
              <AreaChart
                accessibilityLayer
                data={data}
                margin={{ left: -20, right: 12, top: 10 }}
              >
                <defs>
                  <linearGradient id="fillKpiValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={3}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) =>
                        format(new Date(value), 'dd/MM/yyyy')
                      }
                    />
                  }
                />
                <Area
                  dataKey="value"
                  type="natural"
                  fill="url(#fillKpiValue)"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </QueryBoundary>
  )
}
