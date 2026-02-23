export const QUERY_DEFAULTS = {
  staleTime: 60_000,
  retry: 1,
  refetchOnWindowFocus: false,
  refetchInterval: 30_000,
} as const

export const QUERY_DEFAULTS_SLOW = {
  ...QUERY_DEFAULTS,
  staleTime: 90_000,
} as const

export const QUERY_DEFAULTS_FAST = {
  ...QUERY_DEFAULTS,
  staleTime: 30_000,
} as const
