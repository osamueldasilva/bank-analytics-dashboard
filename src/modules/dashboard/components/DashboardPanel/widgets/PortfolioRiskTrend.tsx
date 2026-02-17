'use client'

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
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { usePortfolioTrend } from '../../../hooks/useDashboardQueries'

const chartConfig = {
  riskIndex: {
    label: 'Risk Level',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function PortfolioRiskTrend() {
  const {
    data: portfolioTrend,
    isError,
    isLoading,
    refetch,
  } = usePortfolioTrend()

  return (
    <QueryBoundary
      classError="col-span-8"
      data={portfolioTrend}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      skeletonCount={1}
      skeletonWrapperClass="col-span-8"
      skeletonClass="h-full"
      classEmpty="col-span-8"
    >
      {(data) => (
        <Card className="col-span-8">
          <CardHeader>
            <CardTitle>Portfolio Risk Trend</CardTitle>
            <CardDescription>Last 90 Days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-45 w-full">
              <AreaChart
                accessibilityLayer
                data={data}
                margin={{ left: -20, right: 12, top: 10 }}
              >
                <defs>
                  <linearGradient id="fillRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-2)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-2)"
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
                      labelFormatter={(value) => {
                        return format(new Date(value), 'dd/MM/yyyy')
                      }}
                    />
                  }
                />
                <Area
                  dataKey="riskIndex"
                  type="natural"
                  fill="url(#fillRisk)"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </QueryBoundary>
  )
}
