'use client'

import {
  Calendar,
  Download,
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

import { useDashboardFilters } from '../hooks/useDashboardFilters'
import { useExportDashboardCsv } from '../hooks/useExportDashboardCsv'
import { clearPreferences } from '../storage/dashboardPreferences'
import { DashboardFilters } from '../types/dashboard.filters'

export function DashboardFiltersBar() {
  const { filters, updateFilters } = useDashboardFilters()
  const { exportCsv, isExporting } = useExportDashboardCsv()

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
    <div className="bg-background flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          title="Reset preferences"
          disabled={isDefault}
          className="h-8 w-8"
          onClick={handleResetPreferences}
        >
          <RotateCcw />
        </Button>
        <Select
          value={filters.segment}
          onValueChange={(value) =>
            updateFilters({ segment: value as DashboardFilters['segment'] })
          }
        >
          <SelectTrigger className="h-8 w-52 text-sm">
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
          <SelectTrigger className="h-8 w-52 text-sm font-medium">
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
          <SelectTrigger className="h-8 w-52 text-sm font-medium">
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

      <div className="flex items-center gap-2">
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
          {isExporting ? 'Exporting...' : 'Export CSV'}
        </Button>
      </div>
    </div>
  )
}
