import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const kpis = [
  {
    label: 'Net Exposure',
    value: '$842.3M',
    variation: '+2.4%',
    variationPositive: true,
  },
  {
    label: 'Liquidity Ratio',
    value: '128%',
    variation: '-0.8%',
    variationPositive: false,
  },
  {
    label: 'Credit Risk Index',
    value: '3.42',
    variation: '+0.12',
    variationPositive: true,
  },
  {
    label: 'Fraud Alerts (30d)',
    value: '184',
    variation: '-6.1%',
    variationPositive: false,
  },
  {
    label: 'Portfolio Performance',
    value: '+7.8%',
    variation: '+1.2%',
    variationPositive: true,
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-10 gap-4">
      {kpis.map((kpi, index) => (
        <Card
          key={index}
          className="col-span-2 flex h-32 flex-col justify-center py-2"
          style={{ minWidth: 0 }}
        >
          <CardHeader className="text-muted-foreground text-md mb-1 font-medium">
            <CardTitle>{kpi.label}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-2">
            <span className="text-2xl leading-tight font-bold">
              {kpi.value}
            </span>
            <span
              className={`text-md font-semibold ${
                kpi.variationPositive
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {kpi.variation}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
