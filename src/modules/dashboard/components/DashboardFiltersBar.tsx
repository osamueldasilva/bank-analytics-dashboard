'use client'

import { Calendar, Globe, ShieldAlert } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useDashboardFilters } from '../hooks/useDashboardFilters'
import { DashboardFilters } from '../types/dashboard.filters'

export function DashboardFiltersBar() {
  const { filters, updateFilters } = useDashboardFilters()

  return (
    <div className="bg-background border-border/40 flex flex-wrap items-center gap-3 border-b">
      <div className="flex items-center gap-2">
        <Select
          value={filters.segment}
          onValueChange={(value) =>
            updateFilters({ segment: value as DashboardFilters['segment'] })
          }
        >
          <SelectTrigger className="border-border/40 bg-muted/20 hover:bg-muted/40 h-8 w-40 text-xs font-medium transition-all focus:ring-0">
            <div className="flex items-center gap-2">
              <Globe className="text-muted-foreground h-3.5 w-3.5" />
              <span className="text-muted-foreground font-normal">
                Segment:
              </span>
              <SelectValue placeholder="All" />
            </div>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="All" className="text-xs">
              All
            </SelectItem>
            <SelectItem value="Retail" className="text-xs">
              Retail
            </SelectItem>
            <SelectItem value="Corporate" className="text-xs">
              Corporate
            </SelectItem>
            <SelectItem value="SME" className="text-xs">
              SME
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={filters.period}
          onValueChange={(value) =>
            updateFilters({ period: value as DashboardFilters['period'] })
          }
        >
          <SelectTrigger className="border-border/40 bg-muted/20 hover:bg-muted/40 h-8 w-52 text-xs font-medium transition-all focus:ring-0">
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-3.5 w-3.5" />
              <span className="text-muted-foreground font-normal">Period:</span>
              <SelectValue placeholder="Last 7 days" />
            </div>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="7d" className="text-xs">
              Last 7 days
            </SelectItem>
            <SelectItem value="30d" className="text-xs">
              Last 30 days
            </SelectItem>
            <SelectItem value="90d" className="text-xs">
              Last 90 days
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={filters.riskType}
          onValueChange={(value) =>
            updateFilters({ riskType: value as DashboardFilters['riskType'] })
          }
        >
          <SelectTrigger className="border-border/40 bg-muted/20 hover:bg-muted/40 h-8 w-45 text-xs font-medium transition-all focus:ring-0">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-muted-foreground h-3.5 w-3.5" />
              <span className="text-muted-foreground font-normal">Risk:</span>
              <SelectValue placeholder="All" />
            </div>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="All" className="text-xs">
              All Risks
            </SelectItem>
            <SelectItem value="Credit" className="text-xs">
              Credit
            </SelectItem>
            <SelectItem value="Fraud" className="text-xs">
              Fraud
            </SelectItem>
            <SelectItem value="Liquidity" className="text-xs">
              Liquidity
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
