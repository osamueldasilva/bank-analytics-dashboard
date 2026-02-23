import { z } from 'zod'

export const WIDGET_IDS = [
  'recentRiskEvents',
  'liquidityDistribution',
  'portfolioRiskTrend',
  'fraudOverview',
  'creditExposure',
] as const

export const widgetConfigSchema = z.object({
  widgets: z.object({
    recentRiskEvents: z.boolean().default(true),
    liquidityDistribution: z.boolean().default(true),
    portfolioRiskTrend: z.boolean().default(true),
    fraudOverview: z.boolean().default(true),
    creditExposure: z.boolean().default(true),
  }),
})

export type WidgetId = (typeof WIDGET_IDS)[number]
export type AppConfig = z.infer<typeof widgetConfigSchema>

export const DEFAULT_CONFIG: AppConfig = {
  widgets: {
    recentRiskEvents: true,
    liquidityDistribution: true,
    portfolioRiskTrend: true,
    fraudOverview: true,
    creditExposure: true,
  },
}
