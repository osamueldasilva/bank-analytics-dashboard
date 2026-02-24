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
  options: Array<KpiDetailsFilters['granularity']>
}

export function KpiGranularityFilter({
  granularity,
  onChange,
  options,
}: KpiGranularityFilterProps) {
  return (
    <Select
      value={granularity}
      onValueChange={(value) =>
        onChange(value as KpiDetailsFilters['granularity'])
      }
    >
      <SelectTrigger className="h-8 w-full text-sm sm:w-56">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-muted-foreground h-3.5 w-3.5" />
          <span className="text-muted-foreground font-normal">
            Granularity:
          </span>
          <SelectValue />
        </div>
      </SelectTrigger>

      <SelectContent position="popper">
        {options.map((option) => (
          <SelectItem key={option} value={option} className="text-xs">
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
