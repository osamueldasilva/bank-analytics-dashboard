import { CreditExposure } from './widgets/CreditExposure'
import { FraudOverview } from './widgets/FraudOverview'
import { LiquidityDistribution } from './widgets/LiquidityDistribution'
import { PortfolioRiskTrend } from './widgets/PortfolioRiskTrend'
import { RecentRiskEvents } from './widgets/RecentRiskEvents'

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
