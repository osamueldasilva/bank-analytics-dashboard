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

const statusStyles: Record<string, string> = {
  Open: 'bg-red-900/30 text-red-400',
  Monitoring: 'bg-yellow-900/30 text-yellow-400',
  Closed: 'bg-emerald-900/30 text-emerald-400',
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
      isLoading={isLoading}
      isError={isError}
      skeletonWrapperClass="col-span-12"
      skeletonClass="h-100"
      classEmpty="col-span-12"
      classError="col-span-12"
      onRetry={() => refetch()}
    >
      {(data) => (
        <Card className="col-span-12 min-h-100">
          <CardHeader isFetching={isFetching} onRetry={refetch}>
            <CardTitle>Recent Risk Events</CardTitle>
          </CardHeader>
          <CardContent>
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
                      <TableCell className="font-mono text-xs font-medium">
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
                          className={`${statusStyles[item.status]} font-medium`}
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
            <div className="mt-auto flex items-center justify-between border-t py-4">
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
