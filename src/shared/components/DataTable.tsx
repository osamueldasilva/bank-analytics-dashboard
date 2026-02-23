'use client'

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { type ReactNode } from 'react'

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

export type SortDirection = 'asc' | 'desc'

export interface DataTableColumn<T> {
  key: keyof T & string
  label: string
  sortable?: boolean
  render?: (row: T) => ReactNode
  className?: string
}

export interface DataTableSort {
  field: string
  direction: SortDirection
}

export interface DataTablePagination {
  page: number
  pageSize: number
  total: number
}

export interface DataTableProps<T> {
  title: string
  columns: DataTableColumn<T>[]
  data: T[]
  rowKey: (row: T, index: number) => string | number
  sort?: DataTableSort
  onSortChange?: (field: string, direction: SortDirection) => void
  pagination?: DataTablePagination
  onPageChange?: (page: number) => void
  headerExtra?: ReactNode
  className?: string
}

function SortIcon({
  active,
  direction,
}: {
  active: boolean
  direction?: SortDirection
}) {
  if (!active) {
    return <ArrowUpDown className="text-muted-foreground h-3.5 w-3.5" />
  }
  return direction === 'asc' ? (
    <ArrowUp className="h-3.5 w-3.5" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5" />
  )
}

export function DataTable<T>({
  title,
  columns,
  data,
  rowKey,
  sort,
  onSortChange,
  pagination,
  onPageChange,
  headerExtra,
  className,
}: DataTableProps<T>) {
  const totalPages = pagination
    ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize))
    : 1

  const handleSort = (field: string) => {
    if (!sort || !onSortChange) return

    const isCurrent = sort.field === field
    const next: SortDirection = !isCurrent
      ? 'asc'
      : sort.direction === 'asc'
        ? 'desc'
        : 'asc'

    onSortChange(field, next)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{title}</CardTitle>
          {headerExtra && (
            <div className="flex items-center gap-2">{headerExtra}</div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col">
        <div className="relative max-h-[320px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead key={col.key} className={col.className}>
                    {col.sortable && sort ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 gap-1"
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        <SortIcon
                          active={sort.field === col.key}
                          direction={
                            sort.field === col.key ? sort.direction : undefined
                          }
                        />
                      </Button>
                    ) : (
                      col.label
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row, index) => (
                <TableRow key={rowKey(row, index)}>
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.render
                        ? col.render(row)
                        : String(row[col.key] ?? '—')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {pagination && onPageChange && (
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="text-muted-foreground text-sm">
              Page <strong>{pagination.page}</strong> of{' '}
              <strong>{totalPages}</strong>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.max(pagination.page - 1, 1))}
                disabled={pagination.page === 1}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onPageChange(Math.min(pagination.page + 1, totalPages))
                }
                disabled={pagination.page >= totalPages}
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
