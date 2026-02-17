'use client'
import { Globe } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useDashboardFilters } from '../hooks/useDashboardFilters'
import { DashboardFilters } from '../types/dashboard.filters'

export function Filters() {
  const { filters, updateFilters } = useDashboardFilters()

  return (
    <Select
      value={filters.segment}
      onValueChange={(value) =>
        updateFilters({ segment: value as DashboardFilters['segment'] })
      }
    >
      <SelectTrigger className="border-border/40 bg-muted/20 hover:bg-muted/40 h-8 w-100 text-xs font-medium transition-all focus:ring-0">
        <div className="flex items-center gap-2">
          <Globe className="text-muted-foreground h-3.5 w-3.5" />
          <span className="text-muted-foreground font-normal">Escopo:</span>
          <SelectValue placeholder="Global" />
        </div>
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="global" className="text-xs">
          Global
        </SelectItem>
        <SelectItem value="agencia" className="text-xs">
          Agência
        </SelectItem>
        <SelectItem value="operacao" className="text-xs">
          Operação
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
