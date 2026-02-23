import { Suspense } from 'react'

import { RiskEventsPageClient } from '@/src/modules/risk-events/components/RiskEventsPageClient'

export default async function RiskEventsPage() {
  return (
    <Suspense fallback={null}>
      <div className="mx-auto flex w-full flex-col gap-4">
        <RiskEventsPageClient />
      </div>
    </Suspense>
  )
}
