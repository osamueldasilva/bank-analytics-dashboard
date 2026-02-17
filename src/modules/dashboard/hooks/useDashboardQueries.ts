import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { dashboardService } from '../services/dashboard.service'
import { useDashboardFilters } from './useDashboardFilters'

export const useKpis = () => {
  const { filters } = useDashboardFilters()

  return useQuery({
    queryKey: ['dashboard', 'kpis', filters],
    queryFn: () => dashboardService.getKpis(filters),
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}

export const usePortfolioTrend = () => {
  const { filters } = useDashboardFilters()

  return useQuery({
    queryKey: ['dashboard', 'trend', filters],
    queryFn: () => dashboardService.getPortfolioTrend(filters),
    staleTime: 120000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}

export const useLiquidity = () => {
  const { filters } = useDashboardFilters()

  return useQuery({
    queryKey: ['dashboard', 'liquidity', filters],
    queryFn: () => dashboardService.getLiquidity(filters),
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}

export const useCreditExposure = () => {
  const { filters } = useDashboardFilters()

  return useQuery({
    queryKey: ['dashboard', 'credit-exposure', filters],
    queryFn: () => dashboardService.getCreditExposure(filters),
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}

export const useFraudOverview = () => {
  const { filters } = useDashboardFilters()

  return useQuery({
    queryKey: ['dashboard', 'fraud', filters],
    queryFn: () => dashboardService.getFraudOverview(filters),
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}

export const useRiskEvents = (page: number = 1) => {
  const { filters } = useDashboardFilters()

  return useQuery({
    queryKey: ['dashboard', 'risk-events', filters, page],
    queryFn: () => dashboardService.getRiskEvents(page, filters),
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  })
}
