import { z } from 'zod'

export const kpiDetailsFiltersSchema = z.object({
  granularity: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

export type KpiDetailsFilters = z.infer<typeof kpiDetailsFiltersSchema>
