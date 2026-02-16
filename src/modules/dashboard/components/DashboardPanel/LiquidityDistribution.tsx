'use client'

import { Pie, PieChart } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { useLiquidity } from '../../hooks/useDashboardQueries'

const chartConfig = {
  value: {
    label: 'Percentage',
  },
  retail: {
    label: 'Retail',
    color: 'var(--chart-1)',
  },
  corporate: {
    label: 'Corporate',
    color: 'var(--chart-2)',
  },
  sme: {
    label: 'SME',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function LiquidityDistribution() {
  const { data: liquidity, isError, isLoading, refetch } = useLiquidity()

  return (
    <QueryBoundary
      data={liquidity}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      skeletonWrapperClass="col-span-4"
      skeletonClass="h-full"
      classError="col-span-4"
      classEmpty="col-span-4"
    >
      {(data) => {
        const chartData = data.map((item) => {
          const config =
            chartConfig[item.segment.toLowerCase() as keyof typeof chartConfig]

          return {
            ...item,
            fill: 'color' in config ? config.color : 'var(--chart-1)',
          }
        })

        return (
          <Card className="col-span-4 flex h-full flex-col">
            <CardHeader>
              <CardTitle>Liquidity Distribution</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 items-center p-0 pr-4">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-52"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="percentage"
                    nameKey="segment"
                    innerRadius={45}
                    strokeWidth={5}
                  />
                </PieChart>
              </ChartContainer>

              <div className="flex min-w-30 flex-col gap-3">
                {chartData.map((item) => (
                  <div key={item.segment} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-muted-foreground text-xs font-medium capitalize">
                        {item.segment}
                      </span>
                    </div>
                    <span className="ml-4 text-sm font-bold">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      }}
    </QueryBoundary>
  )
}
