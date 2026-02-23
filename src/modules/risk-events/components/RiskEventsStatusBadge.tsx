import { Badge } from '@/components/ui/badge'

import type { RiskSeverity, RiskStatus } from '../types/riskEvents.types'

type RiskEventsStatusBadgeProps = {
  status: RiskStatus
  severity: RiskSeverity
}

const statusVariantMap: Record<RiskStatus, 'default' | 'secondary'> = {
  open: 'default',
  resolved: 'secondary',
}

const severityVariantMap: Record<
  RiskSeverity,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  low: 'outline',
  medium: 'secondary',
  high: 'default',
  critical: 'destructive',
}

export function RiskEventsStatusBadge({
  status,
  severity,
}: RiskEventsStatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant={statusVariantMap[status]}>{status}</Badge>
      <Badge variant={severityVariantMap[severity]}>{severity}</Badge>
    </div>
  )
}
