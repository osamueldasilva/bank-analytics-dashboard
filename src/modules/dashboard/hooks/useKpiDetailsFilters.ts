'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import {
  KpiDetailsFilters,
  kpiDetailsFiltersSchema,
} from '../schemas/kpiDetailsFilters.schema'

const DEFAULT_KPI_DETAILS_FILTERS: KpiDetailsFilters = {
  granularity: 'daily',
  page: 1,
  pageSize: 10,
}

export function useKpiDetailsFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = useMemo(() => {
    const result = kpiDetailsFiltersSchema.safeParse({
      granularity: searchParams.get('granularity') ?? undefined,
      page: searchParams.get('page') ?? undefined,
      pageSize: searchParams.get('pageSize') ?? undefined,
    })

    return result.success ? result.data : DEFAULT_KPI_DETAILS_FILTERS
  }, [searchParams])

  const updateFilters = (newFilters: Partial<KpiDetailsFilters>) => {
    const params = new URLSearchParams(searchParams.toString())
    const nextFilters = { ...filters, ...newFilters }

    params.set('granularity', nextFilters.granularity)
    params.set('page', String(nextFilters.page))
    params.set('pageSize', String(nextFilters.pageSize))

    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    filters,
    updateFilters,
  }
}
