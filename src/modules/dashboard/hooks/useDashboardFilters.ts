'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { DashboardFilters } from '../types/dashboard.filters'

const DEFAULT_DASHBOARD_FILTERS: DashboardFilters = {
  segment: 'All',
  period: '30d',
  riskType: 'All',
}

const SEGMENT_VALUES: DashboardFilters['segment'][] = [
  'Retail',
  'Corporate',
  'SME',
  'All',
]
const PERIOD_VALUES: DashboardFilters['period'][] = ['7d', '30d', '90d']
const RISK_TYPE_VALUES: DashboardFilters['riskType'][] = [
  'All',
  'Credit',
  'Fraud',
  'Liquidity',
]

const getValidFilterValue = <T extends string>(
  value: string | null,
  allowedValues: T[],
  fallback: T,
): T => {
  if (!value) {
    return fallback
  }

  return (allowedValues as string[]).includes(value) ? (value as T) : fallback
}

export function useDashboardFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters: DashboardFilters = {
    segment: getValidFilterValue(
      searchParams.get('segment'),
      SEGMENT_VALUES,
      DEFAULT_DASHBOARD_FILTERS.segment,
    ),
    period: getValidFilterValue(
      searchParams.get('period'),
      PERIOD_VALUES,
      DEFAULT_DASHBOARD_FILTERS.period,
    ),
    riskType: getValidFilterValue(
      searchParams.get('riskType'),
      RISK_TYPE_VALUES,
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

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return {
    filters,
    updateFilters,
  }
}
