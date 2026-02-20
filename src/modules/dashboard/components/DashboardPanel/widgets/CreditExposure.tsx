'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { useCreditExposure } from '../../../hooks/useDashboardQueries'

const sectorConfig = {
  exposure: { label: 'Exposure ($)', color: 'hsl(var(--foreground))' },
  realestate: { label: 'Real Estate', color: 'var(--chart-1)' },
  energy: { label: 'Energy', color: 'var(--chart-2)' },
  technology: { label: 'Technology', color: 'var(--chart-3)' },
  healthcare: { label: 'Healthcare', color: 'var(--chart-4)' },
} as ChartConfig

export function CreditExposure() {
  const {
    data: creditExposure,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useCreditExposure()

  return (
    <QueryBoundary
      data={creditExposure}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      onRetry={() => refetch()}
      skeleton={{ count: 1, wrapperClassName: 'col-span-6' }}
      className={{
        error: 'col-span-6 h-48',
        empty: 'col-span-6 h-48',
        loading: 'col-span-6 h-48',
      }}
    >
      {(data) => {
        const chartData = data.map((item) => {
          const config =
            sectorConfig[item.sector.toLowerCase() as keyof typeof sectorConfig]

          return {
            ...item,
            fill: config ? config.color : 'var(--chart-1)',
          }
        })

        return (
          <Card className="col-span-6 h-48">
            <CardHeader>
              <CardTitle>Credit Exposure by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={sectorConfig} className="h-24 w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{ left: 20, right: 20 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="sector"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    className="text-sm font-medium"
                    width={65}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Bar
                    dataKey="exposure"
                    layout="vertical"
                    radius={4}
                    barSize={12}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )
      }}
    </QueryBoundary>
  )
}
