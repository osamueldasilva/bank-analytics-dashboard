import { Suspense } from 'react'

import { DashboardPanel } from '@/src/modules/dashboard/components/DashboardPanel'
import { KpiCards } from '@/src/modules/dashboard/components/KpiCards'

export const metadata = {
  title: 'Dashboard | BankOps Analytics',
  description:
    'Main dashboard with KPIs and a consolidated view of banking operations.',
}

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
