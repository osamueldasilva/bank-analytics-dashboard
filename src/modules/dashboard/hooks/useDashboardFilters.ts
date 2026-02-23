'use client'

import { z } from 'zod'

import { DashboardFilters } from '../types/dashboard.filters'
import { useUrlFilters } from './useUrlFilters'

const SegmentSchema = z.enum(['Retail', 'Corporate', 'SME', 'All'])
const PeriodSchema = z.enum(['7d', '30d', '90d'])
const RiskTypeSchema = z.enum(['All', 'Credit', 'Fraud', 'Liquidity'])
const dashboardFiltersSchema = z.object({
  segment: SegmentSchema.default('All'),
  period: PeriodSchema.default('30d'),
  riskType: RiskTypeSchema.default('All'),
})

const DASHBOARD_FILTER_KEYS = ['segment', 'period', 'riskType'] as const

export function useDashboardFilters() {
  const { filters, updateFilters } = useUrlFilters({
    schema: dashboardFiltersSchema,
    keys: DASHBOARD_FILTER_KEYS,
  })

  return {
    filters: filters as DashboardFilters,
    updateFilters: (newFilters: Partial<DashboardFilters>) =>
      updateFilters(newFilters),
  }
}
