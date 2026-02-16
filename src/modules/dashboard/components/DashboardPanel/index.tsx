import { Card } from '@/components/ui/card'

import { PortfolioRiskTrend } from './PortfolioRiskTrend'

export function DashboardPanel() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <PortfolioRiskTrend />
        <Card
          className="col-span-4 flex h-48 items-center justify-center"
          style={{ minWidth: 0 }}
        ></Card>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card
          className="col-span-6 flex h-40 items-center justify-center"
          style={{ minWidth: 0 }}
        ></Card>
        <Card
          className="col-span-6 flex h-40 items-center justify-center"
          style={{ minWidth: 0 }}
        ></Card>
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
