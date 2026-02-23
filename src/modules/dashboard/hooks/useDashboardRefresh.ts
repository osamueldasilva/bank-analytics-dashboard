'use client'

import {
  type QueryFilters,
  useIsFetching,
  useQueryClient,
} from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

const DASHBOARD_QUERY_FILTER: QueryFilters = {
  queryKey: ['dashboard'],
}

export function useDashboardRefresh() {
  const queryClient = useQueryClient()
  const fetchingCount = useIsFetching(DASHBOARD_QUERY_FILTER)

  const refreshDashboard = useCallback(async () => {
    await queryClient.invalidateQueries(DASHBOARD_QUERY_FILTER)
  }, [queryClient])

  return useMemo(
    () => ({
      refreshDashboard,
      isRefreshing: fetchingCount > 0,
      fetchingCount,
    }),
    [refreshDashboard, fetchingCount],
  )
}
