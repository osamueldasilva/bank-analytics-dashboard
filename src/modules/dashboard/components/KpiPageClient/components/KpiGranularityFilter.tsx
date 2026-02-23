import { CalendarDays } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { KpiDetailsFilters } from '@/src/modules/dashboard/schemas/kpiDetailsFilters.schema'

interface KpiGranularityFilterProps {
  granularity: KpiDetailsFilters['granularity']
  onChange: (value: KpiDetailsFilters['granularity']) => void
}

export function KpiGranularityFilter({
  granularity,
  onChange,
}: KpiGranularityFilterProps) {
  return (
    <Select
      value={granularity}
      onValueChange={(value) =>
        onChange(value as KpiDetailsFilters['granularity'])
      }
    >
      <SelectTrigger className="h-8 w-56 text-sm">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-muted-foreground h-3.5 w-3.5" />
          <span className="text-muted-foreground font-normal">
            Granularity:
          </span>
          <SelectValue />
        </div>
      </SelectTrigger>

      <SelectContent position="popper">
        <SelectItem value="daily" className="text-xs">
          Daily
        </SelectItem>
        <SelectItem value="weekly" className="text-xs">
          Weekly
        </SelectItem>
        <SelectItem value="monthly" className="text-xs">
          Monthly
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
