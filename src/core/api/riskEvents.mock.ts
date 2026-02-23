import type {
  RiskEvent,
  RiskEventsFilters,
  RiskEventsPageResponse,
  RiskSeverity,
  RiskStatus,
} from '@/src/modules/risk-events/types/riskEvents.types'

const TITLES = [
  'Multiple failed login attempts detected',
  'Transaction anomaly in corporate account',
  'Latency spike in payment gateway',
  'Policy violation in privileged access',
  'Suspicious API token usage',
  'Unexpected cash-flow volatility',
  'Data pipeline integrity warning',
  'Fraud signal above threshold',
] as const

const SOURCES = [
  'SIEM',
  'Fraud Engine',
  'Core Banking',
  'SOC',
  'API Gateway',
] as const

const SEVERITY_WEIGHT: Record<RiskSeverity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
}

function seededRandom(seed: number): number {
  const value = Math.sin(seed) * 10_000
  return value - Math.floor(value)
}

function dayIso(daysAgo: number): string {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function buildEvent(index: number): RiskEvent {
  const sevPool: RiskSeverity[] = ['low', 'medium', 'high', 'critical']
  const statusPool: RiskStatus[] = ['open', 'resolved']

  const severity =
    sevPool[Math.floor(seededRandom(index * 13) * sevPool.length)]
  const status =
    statusPool[Math.floor(seededRandom(index * 17) * statusPool.length)]
  const occurredAt = dayIso(index % 90)

  return {
    id: `RE-${String(10_000 + index)}`,
    title: TITLES[index % TITLES.length],
    severity,
    status,
    occurredAt,
    resolvedAt: status === 'resolved' ? dayIso((index % 90) - 2) : undefined,
    source: SOURCES[index % SOURCES.length],
    impactValue: Math.floor(seededRandom(index * 19) * 500_000) + 2_500,
  }
}

function parseSort(sort: string): {
  field: keyof RiskEvent
  direction: 'asc' | 'desc'
} {
  const [field, direction] = sort.split(':')
  return {
    field: field as keyof RiskEvent,
    direction: direction === 'asc' ? 'asc' : 'desc',
  }
}

function applyFilters(
  events: RiskEvent[],
  filters: RiskEventsFilters,
): RiskEvent[] {
  return events.filter((event) => {
    if (filters.severity && event.severity !== filters.severity) return false
    if (filters.status && event.status !== filters.status) return false
    if (filters.startDate && event.occurredAt < filters.startDate) return false
    if (filters.endDate && event.occurredAt > filters.endDate) return false
    return true
  })
}

function applySort(events: RiskEvent[], sort: string): RiskEvent[] {
  const { field, direction } = parseSort(sort)
  const multiplier = direction === 'asc' ? 1 : -1

  const ranked = [...events].sort((left, right) => {
    const leftValue = left[field]
    const rightValue = right[field]

    if (field === 'severity') {
      return (
        (SEVERITY_WEIGHT[left.severity] - SEVERITY_WEIGHT[right.severity]) *
        multiplier
      )
    }

    if (typeof leftValue === 'number' && typeof rightValue === 'number') {
      return (leftValue - rightValue) * multiplier
    }

    return String(leftValue).localeCompare(String(rightValue)) * multiplier
  })

  return ranked
}

export function generateRiskEventsPage(
  filters: RiskEventsFilters,
): RiskEventsPageResponse {
  const totalSeed = 240
  const all = Array.from({ length: totalSeed }, (_, index) =>
    buildEvent(index + 1),
  )
  const filtered = applyFilters(all, filters)
  const sorted = applySort(filtered, filters.sort)

  const start = (filters.page - 1) * filters.pageSize
  const end = start + filters.pageSize

  return {
    data: sorted.slice(start, end),
    total: sorted.length,
    page: filters.page,
    pageSize: filters.pageSize,
  }
}
