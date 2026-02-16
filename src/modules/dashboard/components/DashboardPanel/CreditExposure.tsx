'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const sectorData = [
  { sector: 'Real Estate', value: 450, fill: 'var(--chart-1)' },
  { sector: 'Energy', value: 380, fill: 'var(--chart-2)' },
  { sector: 'Technology', value: 520, fill: 'var(--chart-3)' },
  { sector: 'Healthcare', value: 290, fill: 'var(--chart-4)' },
]

const sectorConfig = {
  value: { label: 'Exposure ($)' },
  realestate: { label: 'Real Estate', color: 'var(--chart-1)' },
  energy: { label: 'Energy', color: 'var(--chart-2)' },
  technology: { label: 'Technology', color: 'var(--chart-3)' },
  healthcare: { label: 'Healthcare', color: 'var(--chart-4)' },
} satisfies ChartConfig

export function CreditExposure() {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle>Credit Exposure by Sector</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={sectorConfig} className="h-24 w-full">
          <BarChart
            accessibilityLayer
            data={sectorData}
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
              width={80}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="value" layout="vertical" radius={4} barSize={12} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
