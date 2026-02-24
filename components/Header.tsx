'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

import { DashboardFiltersBar } from '@/src/modules/dashboard/components/DashboardFiltersBar'

import { Badge } from './ui/badge'
import { SidebarTrigger } from './ui/sidebar'

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/dashboard': {
    title: 'Dashboard',
    description: 'Overview of key performance indicators and analytics.',
  },
  '/risk-events': {
    title: 'Risk Events',
    description: 'Monitor and manage risk events across the organization.',
  },
  '/settings': {
    title: 'Settings',
    description: 'Manage dashboard configuration and preferences.',
  },
}

const DEFAULT_META = PAGE_META['/dashboard']

function resolvePageMeta(pathname: string) {
  const match = Object.entries(PAGE_META).find(
    ([route]) => pathname === route || pathname.startsWith(route + '/'),
  )
  return match?.[1] ?? DEFAULT_META
}

export function Header() {
  const pathname = usePathname()
  const { title, description } = resolvePageMeta(pathname)
  const isDashboard =
    pathname === '/dashboard' || pathname.startsWith('/dashboard/')

  return (
    <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b px-4 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <SidebarTrigger className="shrink-0 md:hidden" />

          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-foreground truncate text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
                {title}
              </h1>

              <Badge
                variant="outline"
                className="hidden rounded-sm border-emerald-500 bg-emerald-500/20 px-2 text-[10px] font-bold tracking-wider text-emerald-500 sm:inline-flex"
              >
                LIVE SYSTEM
              </Badge>
            </div>
            <p className="text-muted-foreground hidden truncate text-sm sm:block">
              {description}
            </p>
          </div>
        </div>

        {isDashboard && (
          <div className="flex shrink-0 items-center gap-4">
            <Suspense fallback={null}>
              <DashboardFiltersBar />
            </Suspense>
          </div>
        )}
      </div>
    </header>
  )
}
