'use client'

import {
  Calendar,
  Download,
  Eraser,
  Globe,
  Loader2,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
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

export function DashboardFiltersBar() {
  const { filters, updateFilters } = useDashboardFilters()
  const { exportCsv, isExporting } = useExportDashboardCsv()
  const { refreshDashboard, isRefreshing } = useDashboardRefresh()
  const { can } = useAuth()
  const canExportCsv = can(PERMISSIONS.dashboardExportCsv)

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

  return (
    <div className="flex w-full flex-col gap-2 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 lg:w-auto">
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Select
            value={filters.segment}
            onValueChange={(value) =>
              updateFilters({ segment: value as DashboardFilters['segment'] })
            }
          >
            <SelectTrigger className="h-8 w-full text-sm sm:w-44 lg:w-52">
              <div className="flex items-center gap-2">
                <Globe className="text-muted-foreground h-3.5 w-3.5" />
                <span className="text-muted-foreground font-normal">
                  Segment:
                </span>
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="All" className="text-sm">
                All
              </SelectItem>
              <SelectItem value="Retail" className="text-sm">
                Retail
              </SelectItem>
              <SelectItem value="Corporate" className="text-sm">
                Corporate
              </SelectItem>
              <SelectItem value="SME" className="text-sm">
                SME
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Select
            value={filters.period}
            onValueChange={(value) =>
              updateFilters({ period: value as DashboardFilters['period'] })
            }
          >
            <SelectTrigger className="h-8 w-full text-sm font-medium sm:w-44 lg:w-52">
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-3.5 w-3.5" />
                <span className="text-muted-foreground font-normal">
                  Period:
                </span>
                <SelectValue placeholder="Last 7 days" />
              </div>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="7d" className="text-sm">
                Last 7 days
              </SelectItem>
              <SelectItem value="30d" className="text-sm">
                Last 30 days
              </SelectItem>
              <SelectItem value="90d" className="text-sm">
                Last 90 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Select
            value={filters.riskType}
            onValueChange={(value) =>
              updateFilters({ riskType: value as DashboardFilters['riskType'] })
            }
          >
            <SelectTrigger className="h-8 w-full text-sm font-medium sm:w-44 lg:w-52">
              <div className="flex items-center gap-2">
                <ShieldAlert className="text-muted-foreground h-3.5 w-3.5" />
                <span className="text-muted-foreground font-normal">Risk:</span>
                <SelectValue placeholder="All" />
              </div>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="All" className="text-sm">
                All Risks
              </SelectItem>
              <SelectItem value="Credit" className="text-sm">
                Credit
              </SelectItem>
              <SelectItem value="Fraud" className="text-sm">
                Fraud
              </SelectItem>
              <SelectItem value="Liquidity" className="text-sm">
                Liquidity
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

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

      <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:gap-3">
        <Button
          size="icon"
          variant="outline"
          title="Refresh dashboard"
          disabled={isRefreshing}
          onClick={() => refreshDashboard()}
        >
          <RotateCcw className={isRefreshing ? 'animate-spin' : ''} />
        </Button>

        {canExportCsv && (
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Button
              variant="default"
              size="sm"
              disabled={isExporting}
              className="w-full sm:w-auto"
              onClick={() => exportCsv()}
            >
              {isExporting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
