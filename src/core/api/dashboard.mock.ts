// ─── Seed & Random Utilities ────────────────────────────────────────────────

import { DashboardFilters } from '@/src/modules/dashboard/types/dashboard.filters'

const seededRandom = (seed: number): number => {
  const value = Math.sin(seed) * 10000
  return value - Math.floor(value)
}

const getSeed = (label: string, period: string, segment: string): number =>
  period.length * segment.length * label.length +
  period.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) +
  segment.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) +
  label.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)

const getKpiValue = (
  base: number,
  range: number,
  label: string,
  period: string,
  segment: string,
): number => {
  const seed = getSeed(label, period, segment)
  const value = Math.floor(base + seededRandom(seed) * range)
  if (!Number.isFinite(value))
    throw new Error(`KPI value for ${label} is invalid`)
  return value
}

const getKpiFloat = (
  base: number,
  range: number,
  label: string,
  period: string,
  segment: string,
  decimals = 2,
): number => {
  const seed = getSeed(label, period, segment)
  const value = parseFloat(
    (base + seededRandom(seed) * range).toFixed(decimals),
  )
  if (!Number.isFinite(value))
    throw new Error(`KPI float for ${label} is invalid`)
  return value
}

const getRandom = (base: number, range: number): number => {
  const value = base + (Math.random() * range - range / 2)
  if (!Number.isFinite(value)) throw new Error(`Random value is invalid`)
  return value
}

const segmentMultiplier = (segment: string): number =>
  segment === 'Corporate'
    ? 1.45
    : segment === 'SME'
      ? 0.95
      : segment === 'Retail'
        ? 0.72
        : 1

// ─── Constants ──────────────────────────────────────────────────────────────

const MILLION = 1_000_000
const ONE_DAY_MS = 86_400_000
const RISK_EVENTS_TOTAL = 100
const RISK_EVENTS_PAGE_SIZE = 10

const RISK_TYPES = ['Credit', 'Fraud', 'Liquidity'] as const
const SEGMENTS = ['Corporate', 'Retail', 'SME'] as const
const STATUSES = ['Open', 'Closed', 'Monitoring'] as const

const CREDIT_EXPOSURE_SECTORS = [
  'Real Estate',
  'Energy',
  'Technology',
  'Healthcare',
] as const

// ─── Profile Helpers ────────────────────────────────────────────────────────

const getPeriodDays = (period: string): number =>
  period === '7d' ? 7 : period === '90d' ? 90 : 30

const getPeriodVolatility = (period: string): number =>
  period === '7d' ? 0.7 : period === '90d' ? 1.4 : 1

const getSegmentProfile = (segment: string) => {
  if (segment === 'Corporate') {
    return {
      exposureMultiplier: 1.5,
      riskOffset: 0.35,
      performanceOffset: 0.2,
      volatility: 1.2,
    }
  }
  if (segment === 'Retail') {
    return {
      exposureMultiplier: 1.1,
      riskOffset: 0.55,
      performanceOffset: -0.1,
      volatility: 1.35,
    }
  }
  if (segment === 'SME') {
    return {
      exposureMultiplier: 0.9,
      riskOffset: 0.15,
      performanceOffset: 0.05,
      volatility: 1.1,
    }
  }
  return {
    exposureMultiplier: 1,
    riskOffset: 0,
    performanceOffset: 0,
    volatility: 1,
  }
}

const getLiquidityPercentages = (v1: number, v2: number, v3: number) => {
  const total = v1 + v2 + v3
  if (total <= 0) throw new Error('Total liquidity is invalid')
  const p1 = Math.round((v1 / total) * 100)
  const p2 = Math.round((v2 / total) * 100)
  const p3 = 100 - (p1 + p2)
  return { p1, p2, p3 }
}

const toISODate = (timestamp: number): string => {
  if (!Number.isFinite(timestamp)) throw new Error('Invalid timestamp')
  return new Date(timestamp).toISOString().split('T')[0]
}

const buildRiskEvent = (index: number, now: number) => ({
  id: `RISK-${4821 - index}`,
  type: RISK_TYPES[
    Math.floor(seededRandom((index + 1) * 7) * RISK_TYPES.length)
  ],
  segment:
    SEGMENTS[Math.floor(seededRandom((index + 1) * 11) * SEGMENTS.length)],
  exposure: Math.floor(seededRandom((index + 1) * 13) * 5_000_000) + 100_000,
  status:
    STATUSES[Math.floor(seededRandom((index + 1) * 17) * STATUSES.length)],
  date: toISODate(now - index * ONE_DAY_MS),
})

// ─── Mock Data Generators (Revisados) ───────────────────────────────────────

export function generateKpis(filters: DashboardFilters) {
  const { segment, period } = filters
  const multiplier = segmentMultiplier(segment)

  const buildKpi = (
    id: string,
    label:
      | 'netExposure'
      | 'liquidityRatio'
      | 'creditRiskIndex'
      | 'fraudAlerts'
      | 'portfolioPerformance',
    base: number,
    range: number,
    isCurrency: boolean,
    decimals?: number,
  ) => {
    const rawValue =
      decimals !== undefined
        ? getKpiFloat(base, range, label, period, segment, decimals)
        : getKpiValue(base, range, label, period, segment)
    const rawPrevious =
      decimals !== undefined
        ? getKpiFloat(base, range, `${label}-prev`, period, segment, decimals)
        : getKpiValue(base, range, `${label}-prev`, period, segment)

    const value = parseFloat(
      (isCurrency ? rawValue * multiplier : rawValue).toFixed(decimals ?? 0),
    )
    const previousValue = parseFloat(
      (isCurrency ? rawPrevious * multiplier : rawPrevious).toFixed(
        decimals ?? 0,
      ),
    )

    const delta = parseFloat(
      (((value - previousValue) / previousValue) * 100).toFixed(2),
    )
    if (!Number.isFinite(value) || !Number.isFinite(delta))
      throw new Error(`Invalid KPI calculated for ${label}`)
    return {
      id,
      label,
      value,
      previousValue,
      delta,
      trend: delta >= 0 ? ('up' as const) : ('down' as const),
    }
  }

  return [
    buildKpi('1', 'netExposure', 842_300_000, 50_000_000, true, 0),
    buildKpi('2', 'liquidityRatio', 128, 10, false, 0),
    buildKpi('3', 'creditRiskIndex', 3.42, 0.5, false, 2),
    buildKpi('4', 'fraudAlerts', 184, 40, true, 0),
    buildKpi('5', 'portfolioPerformance', 7.8, 1.5, false, 1),
  ]
}

export function generatePortfolioTrend(filters: DashboardFilters) {
  const { period, segment } = filters
  const days = getPeriodDays(period)
  const segmentProfile = getSegmentProfile(segment)
  const periodVolatility = getPeriodVolatility(period)
  const now = Date.now()

  return Array.from({ length: days }).map((_, i) => {
    const daysFromNow = days - i
    const exposure = parseFloat(
      (
        (800 + Math.random() * 50 * periodVolatility) *
        segmentProfile.exposureMultiplier
      ).toFixed(0),
    )
    const riskIndex = parseFloat(
      (
        3 +
        segmentProfile.riskOffset +
        Math.random() * segmentProfile.volatility * periodVolatility
      ).toFixed(2),
    )
    const performance = parseFloat(
      (
        7 +
        segmentProfile.performanceOffset +
        Math.random() * segmentProfile.volatility * periodVolatility
      ).toFixed(1),
    )

    if (![exposure, riskIndex, performance].every(Number.isFinite))
      throw new Error('Invalid Portfolio Trend generated')

    return {
      date: toISODate(now - daysFromNow * ONE_DAY_MS),
      exposure,
      riskIndex,
      performance,
    }
  })
}

export function generateLiquidity(filters: DashboardFilters) {
  const { segment } = filters
  const v1 = segment === 'Retail' || segment === 'All' ? getRandom(420, 50) : 50
  const v2 =
    segment === 'Corporate' || segment === 'All' ? getRandom(370, 50) : 40
  const v3 = segment === 'SME' || segment === 'All' ? getRandom(210, 30) : 30

  const { p1, p2, p3 } = getLiquidityPercentages(v1, v2, v3)

  return [
    {
      segment: 'Retail' as const,
      value: Math.floor(v1 * MILLION),
      percentage: p1,
    },
    {
      segment: 'Corporate' as const,
      value: Math.floor(v2 * MILLION),
      percentage: p2,
    },
    {
      segment: 'SME' as const,
      value: Math.floor(v3 * MILLION),
      percentage: p3,
    },
  ]
}

export function generateCreditExposure(filters: DashboardFilters) {
  const { segment } = filters
  const multiplier = segment === 'Corporate' ? 2 : 1

  const data = CREDIT_EXPOSURE_SECTORS.map((sector) => {
    const exposure = Math.floor(getRandom(200, 50) * MILLION * multiplier)
    if (!Number.isFinite(exposure)) throw new Error('Invalid Credit Exposure')
    const riskScore = parseFloat((2 + Math.random() * 3).toFixed(1))
    if (!Number.isFinite(riskScore)) throw new Error('Invalid Risk Score')
    return { sector, exposure, riskScore, percentageOfPortfolio: 0 }
  })

  const total = data.reduce((acc, item) => acc + item.exposure, 0)
  return data.map((item) => ({
    ...item,
    percentageOfPortfolio: Math.round((item.exposure / total) * 100),
  }))
}

export function generateFraudOverview(filters: DashboardFilters) {
  const { segment } = filters
  const mod = segment === 'Retail' ? 2.5 : 0.8

  const flaggedTransactions = Math.floor(getRandom(1284, 300) * mod)
  const underInvestigation = Math.floor(getRandom(312, 100) * mod)
  const resolvedLast30d = Math.floor(getRandom(972, 200))
  const fraudRate = parseFloat((0.1 + Math.random() * 0.1 * mod).toFixed(2))

  if (
    ![
      flaggedTransactions,
      underInvestigation,
      resolvedLast30d,
      fraudRate,
    ].every(Number.isFinite)
  )
    throw new Error('Invalid Fraud Overview generated')

  return { flaggedTransactions, underInvestigation, resolvedLast30d, fraudRate }
}

export function generateRiskEvents(
  filters: DashboardFilters,
  page: number = 1,
) {
  const { segment: segmentFilter, riskType: riskTypeFilter } = filters
  const startIndex = (page - 1) * RISK_EVENTS_PAGE_SIZE
  const endIndex = startIndex + RISK_EVENTS_PAGE_SIZE
  const now = Date.now()

  let totalItems = 0
  const items: ReturnType<typeof buildRiskEvent>[] = []

  for (let i = 0; i < RISK_EVENTS_TOTAL; i++) {
    const event = buildRiskEvent(i, now)
    const matchSegment =
      segmentFilter === 'All' || event.segment === segmentFilter
    const matchRisk = riskTypeFilter === 'All' || event.type === riskTypeFilter

    if (!matchSegment || !matchRisk) continue
    if (totalItems >= startIndex && totalItems < endIndex) items.push(event)
    totalItems++
  }

  return {
    items,
    totalItems,
    totalPages: Math.ceil(totalItems / RISK_EVENTS_PAGE_SIZE),
    currentPage: page,
  }
}

export function generateAllRiskEvents(filters: DashboardFilters) {
  const { segment, riskType } = filters
  const now = Date.now()
  const events: ReturnType<typeof buildRiskEvent>[] = []

  for (let i = 0; i < RISK_EVENTS_TOTAL; i++) {
    const event = buildRiskEvent(i, now)
    const matchSegment = segment === 'All' || event.segment === segment
    const matchRisk = riskType === 'All' || event.type === riskType
    if (matchSegment && matchRisk) events.push(event)
  }

  return events
}
