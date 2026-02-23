'use client'

import { useConfig } from '@/src/core/config'

import { CreditExposure } from './widgets/CreditExposure'
import { FraudOverview } from './widgets/FraudOverview'
import { LiquidityDistribution } from './widgets/LiquidityDistribution'
import { PortfolioRiskTrend } from './widgets/PortfolioRiskTrend'
import { RecentRiskEvents } from './widgets/RecentRiskEvents'

export function DashboardPanel() {
  const { config } = useConfig()
  const { widgets } = config

  const portfolioRiskTrendSpan = widgets.liquidityDistribution
    ? 'col-span-12 lg:col-span-8'
    : 'col-span-12'

  const liquidityDistributionSpan = widgets.portfolioRiskTrend
    ? 'col-span-12 lg:col-span-4'
    : 'col-span-12'

  const creditExposureSpan = widgets.fraudOverview
    ? 'col-span-12 lg:col-span-6'
    : 'col-span-12'

  const fraudOverviewSpan = widgets.creditExposure
    ? 'col-span-12 lg:col-span-6'
    : 'col-span-12'

  return (
    <div className="grid grid-flow-dense auto-rows-min grid-cols-12 gap-4">
      {widgets.portfolioRiskTrend && (
        <PortfolioRiskTrend className={portfolioRiskTrendSpan} />
      )}
      {widgets.liquidityDistribution && (
        <LiquidityDistribution className={liquidityDistributionSpan} />
      )}
      {widgets.creditExposure && (
        <CreditExposure className={creditExposureSpan} />
      )}
      {widgets.fraudOverview && <FraudOverview className={fraudOverviewSpan} />}
      {widgets.recentRiskEvents && <RecentRiskEvents className="col-span-12" />}
    </div>
  )
}
