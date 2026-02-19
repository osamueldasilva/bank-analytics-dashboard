'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
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

function resolveSavedPreferences(): Partial<DashboardFilters> {
  if (typeof window === 'undefined') return {}

  try {
    const prefs = getPreferences()
    if (!prefs) return {}

    return {
      segment: prefs.segment,
      period: prefs.period,
      riskType: prefs.riskType,
    }
  } catch {
    return {}
  }
}

function parseFiltersFromParams(params: URLSearchParams): DashboardFilters {
  const hasUrlFilters = !!(
    params.get('segment') ||
    params.get('period') ||
    params.get('riskType')
  )

  const savedPrefs = resolveSavedPreferences()

  return {
    segment: getValidFilterValue(
      SegmentSchema,
      hasUrlFilters ? params.get('segment') : savedPrefs.segment,
      DEFAULT_DASHBOARD_FILTERS.segment,
    ),
    period: getValidFilterValue(
      PeriodSchema,
      hasUrlFilters ? params.get('period') : savedPrefs.period,
      DEFAULT_DASHBOARD_FILTERS.period,
    ),
    riskType: getValidFilterValue(
      RiskTypeSchema,
      hasUrlFilters ? params.get('riskType') : savedPrefs.riskType,
      DEFAULT_DASHBOARD_FILTERS.riskType,
    ),
  }
}

function resolveCurrentFilters(): DashboardFilters {
  if (typeof window === 'undefined') {
    return DEFAULT_DASHBOARD_FILTERS
  }

  return parseFiltersFromParams(new URLSearchParams(window.location.search))
}

export function useDashboardFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const [filters, setFilters] = useState<DashboardFilters>(() =>
    resolveCurrentFilters(),
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    setFilters(resolveCurrentFilters())

    const syncFromUrl = () => {
      setFilters(resolveCurrentFilters())
    }

    window.addEventListener('popstate', syncFromUrl)

    return () => {
      window.removeEventListener('popstate', syncFromUrl)
    }
  }, [pathname])

  const updateFilters = useCallback(
    (newFilters: Partial<DashboardFilters>) => {
      const current =
        typeof window !== 'undefined' ? resolveCurrentFilters() : filters

      const nextFilters: DashboardFilters = {
        ...current,
        ...newFilters,
      }

      const params = new URLSearchParams()
      params.set('segment', nextFilters.segment)
      params.set('period', nextFilters.period)
      params.set('riskType', nextFilters.riskType)

      try {
        savePreferences({
          segment: nextFilters.segment,
          period: nextFilters.period,
          riskType: nextFilters.riskType,
        })
      } catch {}

      setFilters(nextFilters)
      router.replace(`${pathname}?${params.toString()}`)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, router],
  )

  return {
    filters,
    updateFilters,
  }
}
