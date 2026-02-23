import { Suspense } from 'react'

import { RiskEventsPageClient } from '@/src/modules/risk-events/components/RiskEventsPageClient'

export const metadata = {
  title: 'Risk Events | BankOps Analytics',
  description: 'Risk events page with filters, sorting, and analysis.',
}

export default async function RiskEventsPage() {
  return (
    <Suspense fallback={null}>
      <div className="mx-auto flex w-full flex-col">
        <RiskEventsPageClient />
      </div>
    </Suspense>
  )
}
