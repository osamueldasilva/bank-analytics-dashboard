import type { BusinessSegment, RiskType } from '@/src/types/dashboard.types'

export type DashboardFilters = {
  segment: BusinessSegment | 'All'
  period: '7d' | '30d' | '90d'
  riskType: RiskType | 'All'
}
