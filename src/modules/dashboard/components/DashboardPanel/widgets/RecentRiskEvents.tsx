'use client'

import { format } from 'date-fns'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import type { RiskEvent } from '@/src/modules/dashboard/schemas/dashboard.schemas'
import {
  DataTable,
  type DataTableColumn,
} from '@/src/shared/components/DataTable'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { useRiskEvents } from '../../../hooks/useDashboardQueries'
import { formatCurrency } from '../../../utils/dashboard.transform'

function getStatusBadgeStyle(status: string) {
  switch (status) {
    case 'Open':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case 'Monitoring':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'Closed':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const columns: DataTableColumn<RiskEvent>[] = [
  {
    key: 'id',
    label: 'Event ID',
    className: 'w-30',
    render: (row) => (
      <span className="font-mono text-sm font-medium">{row.id}</span>
    ),
  },
  {
    key: 'type',
    label: 'Type',
  },
  {
    key: 'segment',
    label: 'Segment',
  },
  {
    key: 'exposure',
    label: 'Exposure',
    render: (row) => (
      <span className="font-semibold">{formatCurrency(row.exposure)}</span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Badge
        variant="outline"
        className={`font-medium ${getStatusBadgeStyle(row.status)}`}
      >
        {row.status}
      </Badge>
    ),
  },
  {
    key: 'date',
    label: 'Date',
    className: 'text-right',
    render: (row) => (
      <span className="text-muted-foreground">
        {format(new Date(row.date), 'dd/MM/yyyy')}
      </span>
    ),
  },
]

export function RecentRiskEvents() {
  const [page, setPage] = useState(1)

  const {
    data: riskEvents,
    isError,
    isLoading,
    refetch,
    isFetching,
  } = useRiskEvents(page)

  return (
    <QueryBoundary
      data={riskEvents}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      skeleton={{
        wrapperClassName: 'col-span-12',
        className: 'h-100',
      }}
      className={{
        empty: 'col-span-12',
        error: 'col-span-12',
      }}
    >
      {(data) => (
        <DataTable<RiskEvent>
          title="Recent Risk Events"
          columns={columns}
          data={data.items}
          rowKey={(row) => row.id}
          className="col-span-12 min-h-100"
          pagination={{
            page,
            pageSize: data.items.length,
            total: data.totalItems,
          }}
          onPageChange={setPage}
        />
      )}
    </QueryBoundary>
  )
}
