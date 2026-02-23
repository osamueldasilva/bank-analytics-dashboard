'use client'

import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useMemo } from 'react'

import { RiskEventsFiltersSchema } from '../schemas/riskEvents.schema'
import type {
  RiskEventsFilters,
  SortDirection,
  SortField,
} from '../types/riskEvents.types'

function parseFilters(
  searchParams: ReadonlyURLSearchParams,
): RiskEventsFilters {
  const parsed = RiskEventsFiltersSchema.safeParse({
    page: searchParams.get('page') ?? undefined,
    pageSize: searchParams.get('pageSize') ?? undefined,
    severity: searchParams.get('severity') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    startDate: searchParams.get('startDate') ?? undefined,
    endDate: searchParams.get('endDate') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
  })

  if (parsed.success) return parsed.data
  return RiskEventsFiltersSchema.parse({})
}

export function useRiskEventsFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = useMemo(() => parseFilters(searchParams), [searchParams])

  const updateFilters = (next: Partial<RiskEventsFilters>) => {
    const merged = Object.fromEntries(
      Object.entries({ ...filters, ...next }).filter(
        ([, v]) => v !== undefined,
      ),
    )
    const validated = RiskEventsFiltersSchema.safeParse(merged)

    const safe = validated.success
      ? validated.data
      : RiskEventsFiltersSchema.parse({})

    const params = new URLSearchParams()
    params.set('page', String(safe.page))
    params.set('pageSize', String(safe.pageSize))
    params.set('sort', safe.sort)

    if (safe.severity) params.set('severity', safe.severity)
    if (safe.status) params.set('status', safe.status)
    if (safe.startDate) params.set('startDate', safe.startDate)
    if (safe.endDate) params.set('endDate', safe.endDate)

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const onPageChange = (page: number) => {
    updateFilters({ page })
  }

  const onSortChange = (field: SortField, direction: SortDirection) => {
    updateFilters({ sort: `${field}:${direction}`, page: 1 })
  }

  const resetFilters = () => {
    router.replace(pathname, { scroll: false })
  }

  return {
    filters,
    updateFilters,
    onPageChange,
    onSortChange,
    resetFilters,
  }
}
