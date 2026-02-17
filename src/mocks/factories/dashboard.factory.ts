export const MILLION = 1000000
export const ONE_DAY_MS = 86400000
export const RISK_EVENTS_TOTAL = 100
export const RISK_EVENTS_PAGE_SIZE = 10

const RISK_TYPES = ['Credit', 'Fraud', 'Liquidity'] as const
const SEGMENTS = ['Corporate', 'Retail', 'SME'] as const
const STATUSES = ['Open', 'Closed', 'Monitoring'] as const

export const CREDIT_EXPOSURE_SECTORS = [
  'Real Estate',
  'Energy',
  'Technology',
  'Healthcare',
] as const

export const getRandom = (base: number, range: number) =>
  base + (Math.random() * range - range / 2)

export const randomDelay = () => Math.floor(Math.random() * 800) + 200

export const getTrendFromVariation = (variation: number) =>
  variation >= 0 ? 'up' : 'down'

export const seededRandom = (seed: number) => {
  const value = Math.sin(seed) * 10000
  return value - Math.floor(value)
}

export const getPeriodDays = (period: string) =>
  period === '7d' ? 7 : period === '90d' ? 90 : 30

export const getPeriodVolatility = (period: string) =>
  period === '7d' ? 0.7 : period === '90d' ? 1.4 : 1

export const getSegmentProfile = (segment: string) => {
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

export const getLiquidityPercentages = (v1: number, v2: number, v3: number) => {
  const total = v1 + v2 + v3
  const p1 = Math.round((v1 / total) * 100)
  const p2 = Math.round((v2 / total) * 100)
  const p3 = 100 - (p1 + p2)

  return { p1, p2, p3 }
}

export const toISODate = (timestamp: number) =>
  new Date(timestamp).toISOString().split('T')[0]

export const buildRiskEvent = (index: number, now: number) => ({
  id: `RISK-${4821 - index}`,
  type: RISK_TYPES[
    Math.floor(seededRandom((index + 1) * 7) * RISK_TYPES.length)
  ],
  segment:
    SEGMENTS[Math.floor(seededRandom((index + 1) * 11) * SEGMENTS.length)],
  exposure: Math.floor(seededRandom((index + 1) * 13) * 5000000) + 100000,
  status:
    STATUSES[Math.floor(seededRandom((index + 1) * 17) * STATUSES.length)],
  date: toISODate(now - index * ONE_DAY_MS),
})
