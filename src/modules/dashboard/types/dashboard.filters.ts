import { BusinessSegment, RiskType } from './dashboard.types'

export type FilterPeriod = '7d' | '30d' | '90d'

export interface DashboardFilters {
  segment: BusinessSegment | 'All'
  period: FilterPeriod
  riskType: RiskType | 'All'
}
