'use client'

import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

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
        <Card className="col-span-12 min-h-100">
          <CardHeader>
            <CardTitle>Recent Risk Events</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col">
            <div className="relative max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-30">Event ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead>Exposure</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm font-medium">
                        {item.id}
                      </TableCell>

                      <TableCell>{item.type}</TableCell>

                      <TableCell>{item.segment}</TableCell>

                      <TableCell className="font-semibold">
                        {formatCurrency(item.exposure)}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusBadgeStyle(
                            item.status,
                          )} font-medium`}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-muted-foreground text-right">
                        {format(new Date(item.date), 'dd/MM/yyyy')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="text-muted-foreground text-sm">
                Page <strong>{page}</strong> of{' '}
                <strong>{data.totalPages}</strong>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, data.totalPages))
                  }
                  disabled={page >= data.totalPages}
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
