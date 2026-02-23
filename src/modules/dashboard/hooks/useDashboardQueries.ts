import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { QUERY_DEFAULTS, QUERY_DEFAULTS_SLOW } from '@/src/constants'
import type {
  CreditExposureSector,
  FraudOverview,
  KpiMetric,
  LiquiditySegment,
  PortfolioTrendPoint,
  RiskEventsResponse,
} from '@/src/types/dashboard.types'

import { dashboardService } from '../services/dashboard.service'
import { useDashboardFilters } from './useDashboardFilters'

export const useKpis = () => {
  const { filters } = useDashboardFilters()
  return useQuery<KpiMetric[]>({
    queryKey: ['dashboard', 'kpis', filters],
    queryFn: () => dashboardService.getKpis(filters),
    ...QUERY_DEFAULTS,
    placeholderData: keepPreviousData,
  })
}

export const usePortfolioTrend = () => {
  const { filters } = useDashboardFilters()
  return useQuery<PortfolioTrendPoint[]>({
    queryKey: ['dashboard', 'trend', filters],
    queryFn: () => dashboardService.getPortfolioTrend(filters),
    ...QUERY_DEFAULTS,
    staleTime: 120_000,
    placeholderData: keepPreviousData,
  })
}

export const useLiquidity = () => {
  const { filters } = useDashboardFilters()
  return useQuery<LiquiditySegment[]>({
    queryKey: ['dashboard', 'liquidity', filters],
    queryFn: () => dashboardService.getLiquidity(filters),
    ...QUERY_DEFAULTS_SLOW,
    placeholderData: keepPreviousData,
  })
}

export const useCreditExposure = () => {
  const { filters } = useDashboardFilters()
  return useQuery<CreditExposureSector[]>({
    queryKey: ['dashboard', 'credit-exposure', filters],
    queryFn: () => dashboardService.getCreditExposure(filters),
    ...QUERY_DEFAULTS_SLOW,
    placeholderData: keepPreviousData,
  })
}

export const useFraudOverview = () => {
  const { filters } = useDashboardFilters()
  return useQuery<FraudOverview>({
    queryKey: ['dashboard', 'fraud', filters],
    queryFn: () => dashboardService.getFraudOverview(filters),
    ...QUERY_DEFAULTS_SLOW,
    placeholderData: keepPreviousData,
  })
}

export const useRiskEvents = (page: number = 1) => {
  const { filters } = useDashboardFilters()
  return useQuery<RiskEventsResponse>({
    queryKey: ['dashboard', 'risk-events', filters, page],
    queryFn: () => dashboardService.getRiskEvents(page, filters),
    ...QUERY_DEFAULTS_SLOW,
    placeholderData: keepPreviousData,
  })
}
