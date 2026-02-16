'use client'

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

const chartData = [
  { month: 'January', risk: 100 },
  { month: 'February', risk: 52 },
  { month: 'March', risk: 48 },
  { month: 'April', risk: 61 },
  { month: 'May', risk: 55 },
  { month: 'June', risk: 67 },
]

const chartConfig = {
  risk: {
    label: 'Risk Level',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function PortfolioRiskTrend() {
  return (
    <Card className="col-span-8">
      <CardHeader>
        <CardTitle>Portfolio Risk Trend</CardTitle>
        <CardDescription>Last 90 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[180px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
              top: 10,
            }}
          >
            <defs>
              <linearGradient id="fillRisk" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-risk)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-risk)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.4}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="risk"
              type="natural"
              fill="url(#fillRisk)"
              fillOpacity={0.4}
              stroke="var(--color-risk)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
