import { z } from 'zod'

export const KpiMetricSchema = z.object({
  name: z.string(),
  value: z.number(),
  unit: z.string(),
  riskScore: z.number().nullable(),
  fraudRate: z.number(),
})
export type KpiMetric = z.infer<typeof KpiMetricSchema>

export const PortfolioTrendSchema = z.array(
  z.object({
    date: z.string(),
    value: z.number(),
    riskScore: z.number().nullable(),
  }),
)
export type PortfolioTrendPoint = z.infer<typeof PortfolioTrendSchema>[number]

export const LiquiditySchema = z.array(
  z.object({
    segment: z.string(),
    value: z.number(),
  }),
)
export type LiquiditySegment = z.infer<typeof LiquiditySchema>[number]

export const CreditExposureSchema = z.array(
  z.object({
    sector: z.string(),
    value: z.number(),
  }),
)
export type CreditExposureSector = z.infer<typeof CreditExposureSchema>[number]

export const FraudOverviewSchema = z.object({
  fraudRate: z.number(),
  detected: z.number(),
  prevented: z.number(),
})
export type FraudOverview = z.infer<typeof FraudOverviewSchema>

export const RiskEventSchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.string(),
  score: z.number(),
  description: z.string(),
})
export type RiskEvent = z.infer<typeof RiskEventSchema>

export const PaginatedRiskEventsSchema = z.object({
  items: z.array(RiskEventSchema),
  page: z.number(),
  total: z.number(),
})
export type RiskEventsResponse = z.infer<typeof PaginatedRiskEventsSchema>
