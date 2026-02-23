import { z } from 'zod'

export const kpiDetailsFiltersSchema = z.object({
  granularity: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z
    .enum(['date', 'segment', 'value', 'normalizedValue', 'delta', 'status'])
    .default('date'),
  sortOrder: z.enum(['none', 'asc', 'desc']).default('none'),
  category: z.enum(['All', 'Core', 'Watchlist', 'Strategic']).default('All'),
  status: z.enum(['All', 'Open', 'Monitoring', 'Closed']).default('All'),
})

export type KpiDetailsFilters = z.infer<typeof kpiDetailsFiltersSchema>
