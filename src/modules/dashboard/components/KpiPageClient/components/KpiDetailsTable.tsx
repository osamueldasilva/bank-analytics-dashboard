import { format } from 'date-fns'
import { useMemo } from 'react'

import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { KpiDetailsFilters } from '@/src/modules/dashboard/schemas/kpiDetailsFilters.schema'
import { formatCurrency } from '@/src/modules/dashboard/utils/dashboard.transform'
import {
  DataTable,
  DataTableColumn,
  SortDirection,
} from '@/src/shared/components/DataTable'
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

function buildCellRenderer(column: KpiTableColumn) {
  return function CellRenderer(row: Record<string, unknown>) {
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
      case 'status':
        return (
          <Badge
            variant="outline"
            className={`font-medium ${getStatusBadgeClass(String(value))}`}
          >
            {String(value)}
          </Badge>
        )
      case 'number':
      case 'score':
        return Number(value).toFixed(2)
      default:
        return String(value)
    }
  }
}

function toDataTableColumns(
  columns: KpiTableColumn[],
): DataTableColumn<Record<string, unknown>>[] {
  return columns.map((col) => ({
    key: col.key,
    label: col.label,
    sortable: col.sortable,
    render: buildCellRenderer(col),
  }))
}

export function KpiDetailsTable({
  detailsTable,
  updateFilters,
  tableFilters,
  columns,
  additionalFilters,
}: KpiDetailsTableProps) {
  const dataTableColumns = useMemo(() => toDataTableColumns(columns), [columns])

  const sort = useMemo(
    () => ({
      field: tableFilters.sortBy,
      direction: (tableFilters.sortOrder === 'none'
        ? 'asc'
        : tableFilters.sortOrder) as SortDirection,
    }),
    [tableFilters.sortBy, tableFilters.sortOrder],
  )

  const handleSortChange = (field: string, direction: SortDirection) => {
    updateFilters({
      sortBy: field as KpiDetailsFilters['sortBy'],
      sortOrder: direction,
      page: 1,
    })
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
        <DataTable
          title="Detail Records"
          columns={dataTableColumns}
          data={data.rows}
          rowKey={(row, index) => String(row.id ?? index)}
          sort={sort}
          onSortChange={handleSortChange}
          pagination={{
            page: data.currentPage,
            pageSize: tableFilters.pageSize,
            total: data.total,
          }}
          onPageChange={(page) => updateFilters({ page })}
          headerExtra={
            <>
              {additionalFilters.map((filter) => (
                <div key={filter.key} className="flex flex-col gap-1">
                  <label className="text-sm">{filter.label}</label>
                  <Select
                    value={String(tableFilters[filter.key])}
                    onValueChange={(value) =>
                      updateFilters({ [filter.key]: value, page: 1 })
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
                </div>
              ))}
            </>
          }
        />
      )}
    </QueryBoundary>
  )
}
