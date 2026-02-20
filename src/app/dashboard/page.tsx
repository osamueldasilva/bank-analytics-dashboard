import { Suspense } from 'react'

import { DashboardPanel } from '@/src/modules/dashboard/components/DashboardPanel'
import { KpiCards } from '@/src/modules/dashboard/components/KpiCards'

export default async function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <div className="mx-auto flex w-full flex-col gap-4">
        <KpiCards />

        <DashboardPanel />
      </div>
    </Suspense>
  )
}
