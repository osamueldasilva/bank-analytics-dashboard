import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { KpiMetric } from '@/src/modules/dashboard/schemas/dashboard.schemas'
import { mapKpiLabelToDisplay } from '@/src/modules/dashboard/utils/dashboard.transform'

interface KpiDetailsHeaderProps {
  kpiId: string
  onBack: () => void
}

export function KpiDetailsHeader({ kpiId, onBack }: KpiDetailsHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-2xl font-bold">
        {mapKpiLabelToDisplay(kpiId as KpiMetric['label'])}
      </h1>
    </div>
  )
}
