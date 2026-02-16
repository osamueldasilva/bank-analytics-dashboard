import { useQuery } from '@tanstack/react-query'

import { dashboardService } from '../services/dashboard.service'

export const useKpis = () =>
  useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: dashboardService.getKpis,
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  })

export const usePortfolioTrend = () =>
  useQuery({
    queryKey: ['dashboard', 'trend'],
    queryFn: dashboardService.getPortfolioTrend,
    staleTime: 120000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  })

export const useLiquidity = () =>
  useQuery({
    queryKey: ['dashboard', 'liquidity'],
    queryFn: dashboardService.getLiquidity,
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  })

export const useCreditExposure = () =>
  useQuery({
    queryKey: ['dashboard', 'credit-exposure'],
    queryFn: dashboardService.getCreditExposure,
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  })

export const useFraudOverview = () =>
  useQuery({
    queryKey: ['dashboard', 'fraud'],
    queryFn: dashboardService.getFraudOverview,
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  })

export const useRiskEvents = () =>
  useQuery({
    queryKey: ['dashboard', 'risk-events'],
    queryFn: dashboardService.getRiskEvents,
    staleTime: 90000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  })
