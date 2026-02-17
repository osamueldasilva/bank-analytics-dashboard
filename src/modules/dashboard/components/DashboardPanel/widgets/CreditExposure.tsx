'use client'

import React from 'react'
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
} satisfies ChartConfig

export function CreditExposure() {
  const {
    data: creditExposure,
    isError,
    isLoading,
    refetch,
  } = useCreditExposure()

  return (
    <QueryBoundary
      classError="col-span-6"
      data={creditExposure}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      skeletonCount={1}
      skeletonWrapperClass="col-span-6"
      skeletonClass="h-48"
      classEmpty="col-span-6"
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
          <Card className="col-span-6">
            <CardHeader>
              <CardTitle>Credit Exposure by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={sectorConfig} className="h-24 w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{ left: 10, right: 20 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="sector"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    className="text-xs font-medium"
                    width={60}
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
