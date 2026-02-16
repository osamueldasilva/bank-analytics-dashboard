import { CreditExposure } from './CreditExposure'
import { FraudOverview } from './FraudOverview'
import { LiquidityDistribution } from './LiquidityDistribution'
import { PortfolioRiskTrend } from './PortfolioRiskTrend'
import { RecentRiskEvents } from './RecentRiskEvents'

export function DashboardPanel() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <PortfolioRiskTrend />
        <LiquidityDistribution />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <CreditExposure />
        <FraudOverview />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <RecentRiskEvents />
      </div>
    </>
  )
}
