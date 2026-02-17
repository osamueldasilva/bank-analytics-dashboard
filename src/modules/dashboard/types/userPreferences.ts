import { DashboardFilters } from './dashboard.filters'

export type UserPreferences = {
  version: number
  segment?: DashboardFilters['segment']
  period?: DashboardFilters['period']
  riskType?: DashboardFilters['riskType']
  pageSize?: number
  viewMode?: 'grid' | 'list'
}
