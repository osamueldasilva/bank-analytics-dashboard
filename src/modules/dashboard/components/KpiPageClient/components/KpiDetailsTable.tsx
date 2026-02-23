import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
import { QueryBoundary } from '@/src/shared/components/QueryBoundary'

import { KpiDetailsFiltersUpdater, KpiDetailsTableQueryState } from './types'

interface KpiDetailsTableProps {
  detailsTable: KpiDetailsTableQueryState
  updateFilters: KpiDetailsFiltersUpdater
}

export function KpiDetailsTable({
  detailsTable,
  updateFilters,
}: KpiDetailsTableProps) {
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
            <CardTitle>Detail Records</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col">
            <div className="relative max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-40">ID</TableHead>
                    <TableHead className="text-left">Date</TableHead>
                    <TableHead className="text-left">Segment</TableHead>
                    <TableHead className="text-left">Value</TableHead>
                    <TableHead className="text-center">Delta</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.items.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-mono text-xs font-medium">
                        {row.id}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {format(new Date(row.date), 'dd/MM/yyyy')}
                      </TableCell>

                      <TableCell>{row.segment}</TableCell>

                      <TableCell className="font-semibold">
                        {formatCurrency(row.value)}
                      </TableCell>

                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`font-medium ${
                            row.trend === 'up'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {row.trend === 'up' ? '↑' : '↓'}
                          {Math.abs(row.delta).toFixed(2)}%
                        </Badge>
                      </TableCell>
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
