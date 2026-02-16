'use client'

import { format } from 'date-fns'

import { Badge } from '@/components/ui/badge'
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

import { useRiskEvents } from '../../hooks/useDashboardQueries'

const statusStyles: Record<string, string> = {
  Open: 'bg-red-900/30 text-red-400',
  Monitoring: 'bg-yellow-900/30 text-yellow-400',
  Closed: 'bg-emerald-900/30 text-emerald-400',
}

export function RecentRiskEvents() {
  const { data: riskEvents, isError, isLoading, refetch } = useRiskEvents()

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
          <CardHeader>
            <CardTitle>Recent Risk Events</CardTitle>
          </CardHeader>
          <CardContent>
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
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs font-medium">
                      {item.id}
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.segment}</TableCell>
                    <TableCell className="font-semibold">
                      {item.exposure}
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
          </CardContent>
        </Card>
      )}
    </QueryBoundary>
  )
}
