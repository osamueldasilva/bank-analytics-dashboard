'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { z } from 'zod'

import {
  getPreferences,
  savePreferences,
} from '../storage/dashboardPreferences'
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let savedPrefs: Partial<DashboardFilters> = {}

  if (typeof window !== 'undefined') {
    try {
      const prefs = getPreferences()
      if (prefs) {
        savedPrefs = {
          segment: prefs.segment,
          period: prefs.period,
          riskType: prefs.riskType,
        }
      }
    } catch {}
  }

  const hasUrlFilters = !!(
    searchParams.get('segment') ||
    searchParams.get('period') ||
    searchParams.get('riskType')
  )

  const filters: DashboardFilters = useMemo(
    () => ({
      segment: getValidFilterValue(
        SegmentSchema,
        hasUrlFilters ? searchParams.get('segment') : savedPrefs.segment,
        DEFAULT_DASHBOARD_FILTERS.segment,
      ),
      period: getValidFilterValue(
        PeriodSchema,
        hasUrlFilters ? searchParams.get('period') : savedPrefs.period,
        DEFAULT_DASHBOARD_FILTERS.period,
      ),
      riskType: getValidFilterValue(
        RiskTypeSchema,
        hasUrlFilters ? searchParams.get('riskType') : savedPrefs.riskType,
        DEFAULT_DASHBOARD_FILTERS.riskType,
      ),
    }),
    [searchParams, savedPrefs, hasUrlFilters],
  )

  const updateFilters = (newFilters: Partial<DashboardFilters>) => {
    const params = new URLSearchParams(searchParams.toString())
    const nextFilters: DashboardFilters = {
      ...filters,
      ...newFilters,
    }

    params.set('segment', nextFilters.segment)
    params.set('period', nextFilters.period)
    params.set('riskType', nextFilters.riskType)

    if (typeof window !== 'undefined') {
      try {
        savePreferences({
          segment: nextFilters.segment,
          period: nextFilters.period,
          riskType: nextFilters.riskType,
        })
      } catch {}
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    filters,
    updateFilters,
  }
}
