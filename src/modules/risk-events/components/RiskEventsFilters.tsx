'use client'

import { RotateCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useRiskEventsFilters } from '../hooks/useRiskEventsFilters'
import type { RiskSeverity, RiskStatus } from '../types/riskEvents.types'

export function RiskEventsFilters() {
  const { filters, updateFilters, resetFilters } = useRiskEventsFilters()

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex min-w-45 flex-col gap-1">
        <span className="text-muted-foreground text-xs">Severity</span>
        <Select
          value={filters.severity ?? 'all'}
          onValueChange={(value) =>
            updateFilters({
              severity: value === 'all' ? undefined : (value as RiskSeverity),
              page: 1,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex min-w-45 flex-col gap-1">
        <span className="text-muted-foreground text-xs">Status</span>
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(value) =>
            updateFilters({
              status: value === 'all' ? undefined : (value as RiskStatus),
              page: 1,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex min-w-45 flex-col gap-1">
        <span className="text-muted-foreground text-xs">Start date</span>
        <Input
          type="date"
          value={filters.startDate ?? ''}
          onChange={(event) =>
            updateFilters({
              startDate: event.target.value || undefined,
              page: 1,
            })
          }
        />
      </div>

      <div className="flex min-w-45 flex-col gap-1">
        <span className="text-muted-foreground text-xs">End date</span>
        <Input
          type="date"
          value={filters.endDate ?? ''}
          onChange={(event) =>
            updateFilters({ endDate: event.target.value || undefined, page: 1 })
          }
        />
      </div>

      <Button variant="outline" onClick={resetFilters}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  )
}
