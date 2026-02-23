import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { formatKpiValueByType } from '@/src/modules/dashboard/utils/kpi.format'
import { KpiValueType } from '@/src/types/kpi.types'

interface KpiDetailsHeaderProps {
  label: string
  onBack: () => void
  currentValue?: number | null
  variationPercent?: number | null
  valueType: KpiValueType
}

export function KpiDetailsHeader({
  label,
  onBack,
  currentValue,
  variationPercent,
  valueType,
}: KpiDetailsHeaderProps) {
  const variation = variationPercent ?? 0

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{label}</h1>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span className="font-semibold">
            {currentValue !== undefined && currentValue !== null
              ? formatKpiValueByType(currentValue, valueType)
              : '—'}
          </span>
          <span
            className={variation >= 0 ? 'text-emerald-500' : 'text-red-500'}
          >
            {variation >= 0 ? '↑' : '↓'} {Math.abs(variation).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}
