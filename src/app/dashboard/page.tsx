import { DashboardPanel } from '@/src/modules/dashboard/components/DashboardPanel'
import { KpiCards } from '@/src/modules/dashboard/components/KpiCards'

export default async function DashboardPage() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col gap-6">
        <KpiCards />

        <DashboardPanel />
      </div>
    </>
  )
}
