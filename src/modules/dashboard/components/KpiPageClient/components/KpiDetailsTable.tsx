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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { KpiDetailsFilters } from '@/src/modules/dashboard/schemas/kpiDetailsFilters.schema'
import { formatCurrency } from '@/src/modules/dashboard/utils/dashboard.transform'
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'
import { KpiAdditionalFilter, KpiTableColumn } from '@/src/types/kpi.types'

import { KpiDetailsFiltersUpdater, KpiDetailsTableQueryState } from './types'

interface KpiDetailsTableProps {
  detailsTable: KpiDetailsTableQueryState
  updateFilters: KpiDetailsFiltersUpdater
  tableFilters: KpiDetailsFilters
  columns: KpiTableColumn[]
  additionalFilters: KpiAdditionalFilter[]
}

type SortBy = KpiDetailsFilters['sortBy']
type SortOrder = KpiDetailsFilters['sortOrder']

const SORTABLE_KEYS: SortBy[] = [
  'date',
  'segment',
  'value',
  'normalizedValue',
  'delta',
  'status',
]

function isSortableKey(key: string): key is SortBy {
  return SORTABLE_KEYS.includes(key as SortBy)
}

function getStatusBadgeClass(status: string) {
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

function renderCellValue(row: Record<string, unknown>, column: KpiTableColumn) {
  const value = row[column.key]

  if (value === undefined || value === null) return '—'

  switch (column.type) {
    case 'date':
      return format(new Date(String(value)), 'dd/MM/yyyy')
    case 'currency':
      return formatCurrency(Number(value))
    case 'percentage': {
      const numericValue = Number(value)
      return (
        <span
          className={`font-semibold ${numericValue >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
        >
          {numericValue >= 0 ? '+' : ''}
          {numericValue.toFixed(2)}%
        </span>
      )
    }
    case 'number':
    case 'score':
      return Number(value).toFixed(2)
    default:
      return String(value)
  }
}

export function KpiDetailsTable({
  detailsTable,
  updateFilters,
  tableFilters,
  columns,
  additionalFilters,
}: KpiDetailsTableProps) {
  const handleSort = (sortBy: SortBy) => {
    const isCurrentColumn = tableFilters.sortBy === sortBy
    const nextSortOrder: SortOrder = !isCurrentColumn
      ? 'asc'
      : tableFilters.sortOrder === 'asc'
        ? 'desc'
        : tableFilters.sortOrder === 'desc'
          ? 'none'
          : 'asc'

    updateFilters({ sortBy, sortOrder: nextSortOrder, page: 1 })
  }

  const renderSortIcon = (sortBy: SortBy) => {
    const isActive = tableFilters.sortBy === sortBy

    if (!isActive || tableFilters.sortOrder === 'none') {
      return <ArrowUpDown className="text-muted-foreground h-3.5 w-3.5" />
    }

    if (tableFilters.sortOrder === 'asc') {
      return <ArrowUp className="h-3.5 w-3.5" />
    }

    if (tableFilters.sortOrder === 'desc') {
      return <ArrowDown className="h-3.5 w-3.5" />
    }

    return <ArrowUpDown className="text-muted-foreground h-3.5 w-3.5" />
  }
  return (
    <QueryBoundary
      data={detailsTable.data}
      isLoading={detailsTable.isLoading}
      isError={detailsTable.isError}
      isFetching={detailsTable.isFetching}
      onRetry={() => detailsTable.refetch()}
      skeleton={{ count: 1, className: 'h-100' }}
    >
      {(data) => (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Detail Records</CardTitle>

              <div className="flex items-center gap-2">
                {additionalFilters.map((filter) => (
                  <Select
                    key={filter.key}
                    value={String(tableFilters[filter.key])}
                    onValueChange={(value) =>
                      updateFilters({
                        [filter.key]: value,
                        page: 1,
                      })
                    }
                  >
                    <SelectTrigger className="h-8 w-34">
                      <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {filter.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col">
            <div className="relative max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {columns.map((column) => (
                      <TableHead key={column.key} className="text-left">
                        {column.sortable && isSortableKey(column.key) ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 gap-1"
                            onClick={() => handleSort(column.key as SortBy)}
                          >
                            {column.label}
                            {renderSortIcon(column.key)}
                          </Button>
                        ) : (
                          column.label
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.rows.map((row, index) => (
                    <TableRow key={String(row.id ?? `${index}`)}>
                      {columns.map((column) => (
                        <TableCell
                          key={`${String(row.id ?? index)}-${column.key}`}
                        >
                          {column.type === 'status' ? (
                            <Badge
                              variant="outline"
                              className={`font-medium ${getStatusBadgeClass(String(row[column.key] ?? ''))}`}
                            >
                              {String(row[column.key] ?? '—')}
                            </Badge>
                          ) : (
                            renderCellValue(row, column)
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="text-muted-foreground text-sm">
                Page <strong>{data.currentPage}</strong> of{' '}
                <strong>{data.totalPages}</strong>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateFilters({
                      page: Math.max(data.currentPage - 1, 1),
                    })
                  }
                  disabled={data.currentPage === 1}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateFilters({
                      page: Math.min(data.currentPage + 1, data.totalPages),
                    })
                  }
                  disabled={data.currentPage >= data.totalPages}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </QueryBoundary>
  )
}
