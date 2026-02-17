import { DashboardFiltersBar } from '@/src/modules/dashboard/components/DashboardFiltersBar'

import { Badge } from './ui/badge'
import { UserNav } from './UserNav'

export function Header() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-12 backdrop-blur">
      <div className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            BankOps
            <span className="text-muted-foreground font-medium">Analytics</span>
          </h1>

          <Badge
            variant="outline"
            className="rounded-sm border-emerald-500 bg-emerald-500/20 px-2 text-[10px] font-bold tracking-wider text-emerald-500"
          >
            LIVE SYSTEM
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <DashboardFiltersBar />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
