'use client'

import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { useRiskEventsFilters } from '../hooks/useRiskEventsFilters'
import { useRiskEventsQuery } from '../hooks/useRiskEventsQuery'
import { RiskEventsFilters } from './RiskEventsFilters'
import { RiskEventsTable } from './RiskEventsTable'

export function RiskEventsPageClient() {
  const { filters, onPageChange, onSortChange } = useRiskEventsFilters()
  const { data, isLoading, isError, isFetching, refetch } =
    useRiskEventsQuery(filters)

  return (
    <div className="flex flex-col gap-3">
      <RiskEventsFilters />

      <QueryBoundary
        data={data}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        onRetry={() => refetch()}
        skeleton={{ count: 1, className: 'h-100' }}
      >
        {(response) => (
          <RiskEventsTable
            data={response}
            sort={filters.sort}
            onPageChange={onPageChange}
            onSortChange={onSortChange}
          />
        )}
      </QueryBoundary>
    </div>
  )
}
