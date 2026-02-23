'use client'

import { format } from 'date-fns'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/src/modules/dashboard/utils/dashboard.transform'

import type {
  RiskEvent,
  RiskEventsPageResponse,
  SortDirection,
  SortField,
} from '../types/riskEvents.types'

type RiskEventsTableProps = {
  data: RiskEventsPageResponse
  sort: string
  onPageChange: (nextPage: number) => void
  onSortChange: (field: SortField, direction: SortDirection) => void
}

const SORTABLE_FIELDS: SortField[] = [
  'occurredAt',
  'title',
  'severity',
  'impactValue',
]

function parseCurrentSort(sort: string) {
  const [field, direction] = sort.split(':')
  return { field: field as SortField, direction: direction as SortDirection }
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

export function RiskEventsTable({
  data,
  sort,
  onPageChange,
  onSortChange,
}: RiskEventsTableProps) {
  const currentSort = parseCurrentSort(sort)
  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize))

  const handleSort = (field: SortField) => {
    const isCurrent = currentSort.field === field
    const nextDirection: SortDirection = !isCurrent
      ? 'asc'
      : currentSort.direction === 'asc'
        ? 'desc'
        : 'asc'

    onSortChange(field, nextDirection)
  }

  const renderSortIcon = (field: SortField) => {
    const isActive = currentSort.field === field

    if (!isActive) {
      return <ArrowUpDown className="text-muted-foreground h-3.5 w-3.5" />
    }

    return currentSort.direction === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5" />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Events</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col">
        <div className="relative max-h-96 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>
                  {SORTABLE_FIELDS.includes('title') ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8 gap-1"
                      onClick={() => handleSort('title')}
                    >
                      Title
                      {renderSortIcon('title')}
                    </Button>
                  ) : (
                    'Title'
                  )}
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 gap-1"
                    onClick={() => handleSort('occurredAt')}
                  >
                    Occurred At
                    {renderSortIcon('occurredAt')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 gap-1"
                    onClick={() => handleSort('severity')}
                  >
                    Severity
                    {renderSortIcon('severity')}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-3 ml-auto h-8 gap-1"
                    onClick={() => handleSort('impactValue')}
                  >
                    Impact Value
                    {renderSortIcon('impactValue')}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.data.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(event.occurredAt), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-medium ${getSeverityBadgeStyle(event.severity)}`}
                    >
                      {event.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-medium ${getStatusBadgeStyle(event.status)}`}
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.source}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {event.impactValue != null
                      ? formatCurrency(event.impactValue)
                      : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="text-muted-foreground text-sm">
            Page <strong>{data.page}</strong> of <strong>{totalPages}</strong>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(data.page - 1, 1))}
              disabled={data.page === 1}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(data.page + 1, totalPages))}
              disabled={data.page >= totalPages}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
