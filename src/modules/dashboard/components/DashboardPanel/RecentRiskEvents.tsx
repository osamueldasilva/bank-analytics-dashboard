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

const riskEvents = [
  {
    id: 'RISK-4821',
    type: 'Credit',
    segment: 'Corporate',
    exposure: '$2.1M',
    status: 'Open',
    date: '2026-02-10',
  },
  {
    id: 'RISK-4820',
    type: 'Fraud',
    segment: 'Retail',
    exposure: '$480K',
    status: 'Closed',
    date: '2026-02-09',
  },
  {
    id: 'RISK-4819',
    type: 'Liquidity',
    segment: 'SME',
    exposure: '$1.2M',
    status: 'Monitoring',
    date: '2026-02-08',
  },
  {
    id: 'RISK-4818',
    type: 'Credit',
    segment: 'Corporate',
    exposure: '$850K',
    status: 'Open',
    date: '2026-02-07',
  },
  {
    id: 'RISK-4817',
    type: 'Fraud',
    segment: 'SME',
    exposure: '$120K',
    status: 'Closed',
    date: '2026-02-06',
  },
  {
    id: 'RISK-4816',
    type: 'Market',
    segment: 'Retail',
    exposure: '$3.4M',
    status: 'Monitoring',
    date: '2026-02-05',
  },
]

const statusStyles: Record<string, string> = {
  Open: 'bg-red-900/30 text-red-400',
  Monitoring: 'bg-yellow-900/30 text-yellow-400',
  Closed: 'bg-emerald-900/30 text-emerald-400',
}

export function RecentRiskEvents() {
  return (
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
            {riskEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-mono text-xs font-medium">
                  {event.id}
                </TableCell>
                <TableCell>{event.type}</TableCell>
                <TableCell>{event.segment}</TableCell>
                <TableCell className="font-semibold">
                  {event.exposure}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${statusStyles[event.status]} font-medium`}
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-right">
                  {format(new Date(event.date), 'dd/MM/yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
