export const QUERY_DEFAULTS = {
  staleTime: 60_000,
  retry: 1,
  refetchOnWindowFocus: false,
  refetchInterval: 30_000,
} as const

export const DASHBOARD_STALE_TIME = {
  kpis: 30_000,
  metrics: 90_000,
  historicalEvents: 300_000,
} as const

export const QUERY_DEFAULTS_SLOW = {
  ...QUERY_DEFAULTS,
  staleTime: DASHBOARD_STALE_TIME.metrics,
} as const

export const QUERY_DEFAULTS_FAST = {
  ...QUERY_DEFAULTS,
  staleTime: DASHBOARD_STALE_TIME.kpis,
} as const
