import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import DashboardClient from '@/src/modules/dashboard/components/DashboardClient'
import { getTransactions } from '@/src/modules/dashboard/services/transactions.service'
import { getQueryClient } from '@/src/shared/utils/getQueryClient'

export default async function DashboardPage() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  )
}
