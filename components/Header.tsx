'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

import { DashboardFiltersBar } from '@/src/modules/dashboard/components/DashboardFiltersBar'

import { Badge } from './ui/badge'

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/dashboard': {
    title: 'Dashboard',
    description: 'Overview of key performance indicators and analytics.',
  },
  '/risk-events': {
    title: 'Risk Events',
    description: 'Monitor and manage risk events across the organization.',
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
    <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b px-12 backdrop-blur">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-foreground text-3xl font-bold tracking-tight">
                {title}
              </h1>

              <Badge
                variant="outline"
                className="rounded-sm border-emerald-500 bg-emerald-500/20 px-2 text-[10px] font-bold tracking-wider text-emerald-500"
              >
                LIVE SYSTEM
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>

        {isDashboard && (
          <div className="flex items-center gap-4">
            <Suspense fallback={null}>
              <DashboardFiltersBar />
            </Suspense>
          </div>
        )}
      </div>
    </header>
  )
}
