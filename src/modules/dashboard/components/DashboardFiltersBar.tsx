'use client'

import {
  Calendar,
  Download,
  Eraser,
  Filter,
  Globe,
  Loader2,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PERMISSIONS } from '@/src/constants'
import { useAuth } from '@/src/core/auth'

import { useDashboardFilters } from '../hooks/useDashboardFilters'
import { useDashboardRefresh } from '../hooks/useDashboardRefresh'
import { useExportDashboardCsv } from '../hooks/useExportDashboardCsv'
import { clearPreferences } from '../storage/dashboardPreferences'
import { DashboardFilters } from '../types/dashboard.filters'

interface FiltersContentProps {
  filters: DashboardFilters
  updateFilters: (partial: Partial<DashboardFilters>) => void
  isDefault: boolean
  onReset: () => void
}

function FiltersContent({
  filters,
  updateFilters,
  isDefault,
  onReset,
}: FiltersContentProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Segment
        </span>
        <Select
          value={filters.segment}
          onValueChange={(value) =>
            updateFilters({ segment: value as DashboardFilters['segment'] })
          }
        >
          <SelectTrigger className="h-9 w-full text-sm">
            <div className="flex items-center gap-2">
              <Globe className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
              <SelectValue placeholder="All" />
            </div>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
            <SelectItem value="SME">SME</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Period
        </span>
        <Select
          value={filters.period}
          onValueChange={(value) =>
            updateFilters({ period: value as DashboardFilters['period'] })
          }
        >
          <SelectTrigger className="h-9 w-full text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
              <SelectValue placeholder="Last 7 days" />
            </div>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Risk Type
        </span>
        <Select
          value={filters.riskType}
          onValueChange={(value) =>
            updateFilters({ riskType: value as DashboardFilters['riskType'] })
          }
        >
          <SelectTrigger className="h-9 w-full text-sm">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
              <SelectValue placeholder="All" />
            </div>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="All">All Risks</SelectItem>
            <SelectItem value="Credit">Credit</SelectItem>
            <SelectItem value="Fraud">Fraud</SelectItem>
            <SelectItem value="Liquidity">Liquidity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        size="sm"
        variant="destructive"
        title="Reset preferences"
        disabled={isDefault}
        onClick={onReset}
        className="mt-1 w-full"
      >
        <Eraser className="h-3.5 w-3.5" />
        Reset Filters
      </Button>
    </div>
  )
}

export function DashboardFiltersBar() {
  const { filters, updateFilters } = useDashboardFilters()
  const { exportCsv, isExporting } = useExportDashboardCsv()
  const { refreshDashboard, isRefreshing } = useDashboardRefresh()
  const { can } = useAuth()
  const canExportCsv = can(PERMISSIONS.dashboardExportCsv)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const handleResetPreferences = () => {
    clearPreferences()
    if (router && pathname) {
      router.replace(`${pathname}?segment=All&period=30d&riskType=All`)
    }
  }

  const isDefault =
    filters.segment === 'All' &&
    filters.period === '30d' &&
    filters.riskType === 'All'

  const activeFilterCount = [
    filters.segment !== 'All',
    filters.period !== '30d',
    filters.riskType !== 'All',
  ].filter(Boolean).length

  const isKpiPage = pathname && pathname.includes('/dashboard/kpi/')

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="lg:hidden">
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
          <PopoverContent align="end" className="w-72">
            <PopoverHeader>
              <PopoverTitle className="flex items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                Dashboard Filters
              </PopoverTitle>
            </PopoverHeader>
            <FiltersContent
              filters={filters}
              updateFilters={updateFilters}
              isDefault={isDefault}
              onReset={handleResetPreferences}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <Select
          value={filters.segment}
          onValueChange={(value) =>
            updateFilters({ segment: value as DashboardFilters['segment'] })
          }
        >
          <SelectTrigger className="h-8 w-52 text-sm">
            <div className="flex items-center gap-1.5">
              <Globe className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
              <span className="text-muted-foreground font-normal">
                Segment:
              </span>
              <SelectValue placeholder="All" />
            </div>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
            <SelectItem value="SME">SME</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.period}
          onValueChange={(value) =>
            updateFilters({ period: value as DashboardFilters['period'] })
          }
        >
          <SelectTrigger className="h-8 w-52 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
              <span className="text-muted-foreground font-normal">Period:</span>
              <SelectValue placeholder="Last 7 days" />
            </div>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.riskType}
          onValueChange={(value) =>
            updateFilters({ riskType: value as DashboardFilters['riskType'] })
          }
        >
          <SelectTrigger className="h-8 w-52 text-sm">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
              <span className="text-muted-foreground font-normal">Risk:</span>
              <SelectValue placeholder="All" />
            </div>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="All">All Risks</SelectItem>
            <SelectItem value="Credit">Credit</SelectItem>
            <SelectItem value="Fraud">Fraud</SelectItem>
            <SelectItem value="Liquidity">Liquidity</SelectItem>
          </SelectContent>
        </Select>

        <Button
          size="icon"
          variant="destructive"
          title="Reset preferences"
          disabled={isDefault}
          onClick={handleResetPreferences}
        >
          <Eraser />
        </Button>
      </div>

      {!isKpiPage && (
        <>
          <Button
            size="icon"
            variant="outline"
            title="Refresh dashboard"
            disabled={isRefreshing}
            onClick={() => refreshDashboard()}
            className="shrink-0"
          >
            <RotateCcw className={isRefreshing ? 'animate-spin' : ''} />
          </Button>

          {canExportCsv && (
            <Button
              variant="default"
              size="sm"
              disabled={isExporting}
              onClick={() => exportCsv()}
            >
              {isExporting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">
                {isExporting ? 'Exporting...' : 'Export CSV'}
              </span>
            </Button>
          )}
        </>
      )}
    </div>
  )
}
