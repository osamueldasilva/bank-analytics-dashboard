'use client'

import { format } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/src/modules/dashboard/utils/dashboard.transform'
import {
  DataTable,
  type DataTableColumn,
} from '@/src/shared/components/DataTable'

import type {
  RiskEvent,
  RiskEventsPageResponse,
  SortDirection,
  SortExpression,
  SortField,
} from '../types/riskEvents.types'

type RiskEventsTableProps = {
  data: RiskEventsPageResponse
  sort: SortExpression
  onPageChange: (nextPage: number) => void
  onSortChange: (field: SortField, direction: SortDirection) => void
}

function parseCurrentSort(sort: SortExpression) {
  const [field, direction] = sort.split(':')
  return { field: field as SortField, direction: direction as SortDirection }
}

function formatLocalIsoDate(dateValue: string): string {
  const [year, month, day] = dateValue.split('-').map(Number)

  if (!year || !month || !day) {
    return dateValue
  }

  return format(new Date(year, month - 1, day), 'dd/MM/yyyy')
}

function getSeverityBadgeStyle(severity: RiskEvent['severity']) {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case 'high':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'medium':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case 'low':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

function getStatusBadgeStyle(status: RiskEvent['status']) {
  switch (status) {
    case 'open':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case 'resolved':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const columns: DataTableColumn<RiskEvent>[] = [
  {
    key: 'title',
    label: 'Title',
    sortable: true,
    render: (row) => <span className="font-medium">{row.title}</span>,
  },
  {
    key: 'occurredAt',
    label: 'Occurred At',
    sortable: true,
    render: (row) => (
      <span className="text-muted-foreground">
        {formatLocalIsoDate(row.occurredAt)}
      </span>
    ),
  },
  {
    key: 'severity',
    label: 'Severity',
    sortable: true,
    render: (row) => (
      <Badge
        variant="outline"
        className={`font-medium ${getSeverityBadgeStyle(row.severity)}`}
      >
        {row.severity}
      </Badge>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
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
    key: 'source',
    label: 'Source',
  },
  {
    key: 'impactValue',
    label: 'Impact Value',
    sortable: true,
    className: 'text-right',
    render: (row) => (
      <span className="font-semibold">
        {row.impactValue != null ? formatCurrency(row.impactValue) : '—'}
      </span>
    ),
  },
]

export function RiskEventsTable({
  data,
  sort,
  onPageChange,
  onSortChange,
}: RiskEventsTableProps) {
  const currentSort = parseCurrentSort(sort)

  return (
    <DataTable<RiskEvent>
      title="Risk Events"
      columns={columns}
      data={data.data}
      rowKey={(row) => row.id}
      sort={currentSort}
      onSortChange={(field, direction) =>
        onSortChange(field as SortField, direction as SortDirection)
      }
      pagination={{
        page: data.page,
        pageSize: data.pageSize,
        total: data.total,
      }}
      onPageChange={onPageChange}
    />
  )
}
