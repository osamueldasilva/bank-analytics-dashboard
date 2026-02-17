'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { DashboardFilters } from '../types/dashboard.filters'

const SegmentSchema = z.enum(['Retail', 'Corporate', 'SME', 'All'])
const PeriodSchema = z.enum(['7d', '30d', '90d'])
const RiskTypeSchema = z.enum(['All', 'Credit', 'Fraud', 'Liquidity'])

const DEFAULT_DASHBOARD_FILTERS: DashboardFilters = {
  segment: 'All',
  period: '30d',
  riskType: 'All',
}

function getValidFilterValue<T extends z.ZodTypeAny>(
  schema: T,
  value: unknown,
  fallback: z.infer<T>,
): z.infer<T> {
  const result = schema.safeParse(value)
  return result.success ? result.data : fallback
}

export function useDashboardFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters: DashboardFilters = {
    segment: getValidFilterValue(
      SegmentSchema,
      searchParams.get('segment'),
      DEFAULT_DASHBOARD_FILTERS.segment,
    ),
    period: getValidFilterValue(
      PeriodSchema,
      searchParams.get('period'),
      DEFAULT_DASHBOARD_FILTERS.period,
    ),
    riskType: getValidFilterValue(
      RiskTypeSchema,
      searchParams.get('riskType'),
      DEFAULT_DASHBOARD_FILTERS.riskType,
    ),
  }

  const updateFilters = (newFilters: Partial<DashboardFilters>) => {
    const params = new URLSearchParams(searchParams.toString())
    const nextFilters: DashboardFilters = {
      ...filters,
      ...newFilters,
    }

    params.set('segment', nextFilters.segment)
    params.set('period', nextFilters.period)
    params.set('riskType', nextFilters.riskType)

    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    filters,
    updateFilters,
  }
}
