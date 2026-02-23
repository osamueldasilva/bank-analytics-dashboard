import { z } from 'zod'

export const RiskSeveritySchema = z.enum(['low', 'medium', 'high', 'critical'])
export const RiskStatusSchema = z.enum(['open', 'resolved'])

export const RiskEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  severity: RiskSeveritySchema,
  status: RiskStatusSchema,
  occurredAt: z.string(),
  resolvedAt: z.string().optional(),
  source: z.string(),
  impactValue: z.number().optional(),
})

export const RiskEventsPageResponseSchema = z.object({
  data: z.array(RiskEventSchema),
  total: z.number().int().min(0),
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
})

export const SortFieldSchema = z.enum([
  'occurredAt',
  'title',
  'severity',
  'status',
  'source',
  'impactValue',
])

export const SortDirectionSchema = z.enum(['asc', 'desc'])

export const SortExpressionSchema = z
  .string()
  .regex(
    /^(occurredAt|title|severity|status|source|impactValue):(asc|desc)$/,
    'Formato de sort inválido',
  )

export const RiskEventsFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  severity: RiskSeveritySchema.optional(),
  status: RiskStatusSchema.optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sort: SortExpressionSchema.default('occurredAt:desc'),
})
