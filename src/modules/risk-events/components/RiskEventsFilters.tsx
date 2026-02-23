'use client'

import { RotateCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FilterSelect } from '@/src/shared/components/FilterSelect'

import { useRiskEventsFilters } from '../hooks/useRiskEventsFilters'
import type { RiskSeverity, RiskStatus } from '../types/riskEvents.types'

const SEVERITY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'resolved', label: 'Resolved' },
]

export function RiskEventsFilters() {
  const { filters, updateFilters, resetFilters } = useRiskEventsFilters()

  const hasActiveFilters =
    !!filters.severity ||
    !!filters.status ||
    !!filters.startDate ||
    !!filters.endDate

  return (
    <div className="flex flex-wrap items-end gap-3">
      <FilterSelect
        label="Severity"
        value={filters.severity ?? 'all'}
        options={SEVERITY_OPTIONS}
        onChange={(value) =>
          updateFilters({
            severity: value === 'all' ? undefined : (value as RiskSeverity),
            page: 1,
          })
        }
      />

      <FilterSelect
        label="Status"
        value={filters.status ?? 'all'}
        options={STATUS_OPTIONS}
        onChange={(value) =>
          updateFilters({
            status: value === 'all' ? undefined : (value as RiskStatus),
            page: 1,
          })
        }
      />

      <div className="flex min-w-45 flex-col gap-1">
        <span className="text-muted-foreground text-sm">Start date</span>
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
        <span className="text-muted-foreground text-sm">End date</span>
        <Input
          type="date"
          value={filters.endDate ?? ''}
          onChange={(event) =>
            updateFilters({ endDate: event.target.value || undefined, page: 1 })
          }
        />
      </div>

      <Button
        variant="outline"
        disabled={!hasActiveFilters}
        onClick={resetFilters}
        title="Reset Filters"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  )
}
