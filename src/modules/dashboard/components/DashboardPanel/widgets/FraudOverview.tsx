'use client'

import { AlertCircle, CheckCircle2, Search } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { useFraudOverview } from '../../../hooks/useDashboardQueries'

export function FraudOverview() {
  const {
    data: fraudOverview,
    isError,
    isLoading,
    refetch,
    isFetching,
  } = useFraudOverview()

  return (
    <QueryBoundary
      data={fraudOverview}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      onRetry={() => refetch()}
      skeleton={{
        wrapperClassName: 'col-span-6 h-48',
        className: 'h-48',
      }}
      className={{
        empty: 'col-span-6',
        error: 'col-span-6 h-48',
      }}
    >
      {(data) => {
        const metrics = [
          {
            label: 'Flagged Transactions',
            value: data.flaggedTransactions.toLocaleString(),
            icon: AlertCircle,
            color: 'text-destructive',
          },
          {
            label: 'Under Investigation',
            value: data.underInvestigation.toLocaleString(),
            icon: Search,
            color: 'text-blue-500',
          },
          {
            label: 'Resolved (30d)',
            value: data.resolvedLast30d.toLocaleString(),
            icon: CheckCircle2,
            color: 'text-emerald-500',
          },
        ]

        return (
          <Card className="col-span-6 h-48">
            <CardHeader>
              <CardTitle>Fraud Detection Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4 pt-2">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <metric.icon className={`h-4 w-4 ${metric.color}`} />
                    <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                      {metric.label}
                    </span>
                  </div>
                  <p className="text-xl font-bold tracking-tight">
                    {metric.value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )
      }}
    </QueryBoundary>
  )
}
