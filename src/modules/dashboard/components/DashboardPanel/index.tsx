import { Card } from '@/components/ui/card'

import { CreditExposure } from './CreditExposure'
import { FraudOverview } from './FraudOverview'
import { LiquidityDistribution } from './LiquidityDistribution'
import { PortfolioRiskTrend } from './PortfolioRiskTrend'

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
        <Card
          className="col-span-12 flex h-32 items-center justify-center"
          style={{ minWidth: 0 }}
        ></Card>
      </div>
    </>
  )
}
