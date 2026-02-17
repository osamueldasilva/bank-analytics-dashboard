import { creditExposureHandlers } from './handlers/creditExposureHandlers'
import { fraudOverviewHandlers } from './handlers/fraudOverviewHandlers'
import { kpiHandlers } from './handlers/kpiHandlers'
import { liquidityHandlers } from './handlers/liquidityHandlers'
import { portfolioTrendHandlers } from './handlers/portfolioTrendHandlers'
import { riskEventsHandlers } from './handlers/riskEventsHandlers'

export const handlers = [
  ...kpiHandlers,
  ...portfolioTrendHandlers,
  ...liquidityHandlers,
  ...creditExposureHandlers,
  ...fraudOverviewHandlers,
  ...riskEventsHandlers,
]
