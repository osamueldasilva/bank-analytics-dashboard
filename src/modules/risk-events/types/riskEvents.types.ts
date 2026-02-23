import { z } from 'zod'

import {
  RiskEventSchema,
  RiskEventsFiltersSchema,
  RiskEventsPageResponseSchema,
  RiskSeveritySchema,
  RiskStatusSchema,
  SortDirectionSchema,
  SortExpressionSchema,
  SortFieldSchema,
} from '../schemas/riskEvents.schema'

export type RiskSeverity = z.infer<typeof RiskSeveritySchema>
export type RiskStatus = z.infer<typeof RiskStatusSchema>
export type SortField = z.infer<typeof SortFieldSchema>
export type SortDirection = z.infer<typeof SortDirectionSchema>
export type SortExpression = z.infer<typeof SortExpressionSchema>

export type RiskEvent = z.infer<typeof RiskEventSchema>
export type RiskEventsFilters = z.infer<typeof RiskEventsFiltersSchema>
export type RiskEventsPageResponse = z.infer<
  typeof RiskEventsPageResponseSchema
>
