'use client'

import { Eraser, Filter } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FilterSelect } from '@/src/shared/components/FilterSelect'

import { useRiskEventsFilters } from '../hooks/useRiskEventsFilters'
import type {
  RiskEventsFilters as RiskEventsFiltersType,
  RiskSeverity,
  RiskStatus,
} from '../types/riskEvents.types'

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

interface FiltersContentProps {
  filters: RiskEventsFiltersType
  updateFilters: (partial: Partial<RiskEventsFiltersType>) => void
  resetFilters: () => void
  hasActiveFilters: boolean
}

function FiltersContent({
  filters,
  updateFilters,
  resetFilters,
  hasActiveFilters,
}: FiltersContentProps) {
  return (
    <div className="flex flex-col gap-3">
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

      <div className="flex flex-col gap-1">
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

      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm">End date</span>
        <Input
          type="date"
          value={filters.endDate ?? ''}
          onChange={(event) =>
            updateFilters({
              endDate: event.target.value || undefined,
              page: 1,
            })
          }
        />
      </div>

      <Button
        variant="destructive"
        size="sm"
        disabled={!hasActiveFilters}
        onClick={resetFilters}
        title="Reset Filters"
        className="mt-1 w-full"
      >
        <Eraser className="h-3.5 w-3.5" />
        Reset Filters
      </Button>
    </div>
  )
}

export function RiskEventsFilters() {
  const { filters, updateFilters, resetFilters } = useRiskEventsFilters()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const hasActiveFilters =
    !!filters.severity ||
    !!filters.status ||
    !!filters.startDate ||
    !!filters.endDate

  const activeFilterCount = [
    !!filters.severity,
    !!filters.status,
    !!filters.startDate,
    !!filters.endDate,
  ].filter(Boolean).length

  return (
    <>
      <div className="flex justify-end lg:hidden">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="relative gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <Badge className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72">
            <PopoverHeader>
              <PopoverTitle className="flex items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                Risk Event Filters
              </PopoverTitle>
            </PopoverHeader>
            <FiltersContent
              filters={filters}
              updateFilters={updateFilters}
              resetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="hidden flex-wrap items-end gap-3 lg:flex">
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
              updateFilters({
                endDate: event.target.value || undefined,
                page: 1,
              })
            }
          />
        </div>

        <Button
          variant="destructive"
          disabled={!hasActiveFilters}
          onClick={resetFilters}
          title="Reset Filters"
        >
          <Eraser className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
