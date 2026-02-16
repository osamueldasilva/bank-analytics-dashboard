import { AlertCircle, CheckCircle2, Search } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FraudOverview() {
  const metrics = [
    {
      label: 'Flagged Transactions',
      value: '1,284',
      icon: AlertCircle,
      color: 'text-destructive',
    },
    {
      label: 'Under Investigation',
      value: '312',
      icon: Search,
      color: 'text-blue-500',
    },
    {
      label: 'Resolved (30d)',
      value: '972',
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
            <p className="text-xl font-bold tracking-tight">{metric.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
