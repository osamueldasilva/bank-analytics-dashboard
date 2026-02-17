import { z } from 'zod'

export const KpiMetricSchema = z.object({
  id: z.string(),
  label: z.enum([
    'netExposure',
    'liquidityRatio',
    'creditRiskIndex',
    'fraudAlerts',
    'portfolioPerformance',
  ]),
  value: z.number(),
  previousValue: z.number(),
  delta: z.number(),
  trend: z.enum(['up', 'down']),
})
export type KpiMetric = z.infer<typeof KpiMetricSchema>

export const PortfolioTrendSchema = z.array(
  z.object({
    date: z.string(),
    exposure: z.number(),
    riskIndex: z.number(),
    performance: z.number(),
  }),
)
export type PortfolioTrendPoint = z.infer<typeof PortfolioTrendSchema>[number]

export const LiquiditySchema = z.array(
  z.object({
    segment: z.enum(['Retail', 'Corporate', 'SME']),
    value: z.number(),
    percentage: z.number(),
  }),
)
export type LiquiditySegment = z.infer<typeof LiquiditySchema>[number]

export const CreditExposureSchema = z.array(
  z.object({
    sector: z.string(),
    exposure: z.number(),
    riskScore: z.number(),
    percentageOfPortfolio: z.number(),
  }),
)
export type CreditExposureSector = z.infer<typeof CreditExposureSchema>[number]

export const FraudOverviewSchema = z.object({
  flaggedTransactions: z.number(),
  underInvestigation: z.number(),
  resolvedLast30d: z.number(),
  fraudRate: z.number(),
})
export type FraudOverview = z.infer<typeof FraudOverviewSchema>

export const RiskEventSchema = z.object({
  id: z.string(),
  type: z.enum(['Credit', 'Fraud', 'Liquidity']),
  segment: z.enum(['Retail', 'Corporate', 'SME']),
  exposure: z.number(),
  status: z.enum(['Open', 'Monitoring', 'Closed']),
  date: z.string(),
})
export type RiskEvent = z.infer<typeof RiskEventSchema>

export const PaginatedRiskEventsSchema = z.object({
  items: z.array(RiskEventSchema),
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
})
export type RiskEventsResponse = z.infer<typeof PaginatedRiskEventsSchema>
