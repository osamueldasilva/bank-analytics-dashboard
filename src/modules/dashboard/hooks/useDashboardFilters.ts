'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { DashboardFilters } from '../types/dashboard.filters'

export function useDashboardFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters: DashboardFilters = {
    segment:
      (searchParams.get('segment') as DashboardFilters['segment']) || 'All',
    period: (searchParams.get('period') as DashboardFilters['period']) || '30d',
    riskType:
      (searchParams.get('riskType') as DashboardFilters['riskType']) || 'All',
  }

  const updateFilters = (newFilters: Partial<DashboardFilters>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    filters,
    updateFilters,
  }
}
