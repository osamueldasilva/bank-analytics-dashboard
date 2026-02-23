import { Suspense } from 'react'

import { SettingsPageClient } from './SettingsPageClient'

export const metadata = {
  title: 'Settings | BankOps Analytics',
  description: 'Dashboard settings and widget preferences.',
}

export default async function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <div className="mx-auto flex w-full flex-col">
        <SettingsPageClient />
      </div>
    </Suspense>
  )
}
