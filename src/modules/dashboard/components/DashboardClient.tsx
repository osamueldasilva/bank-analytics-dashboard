'use client'

import { useQuery } from '@tanstack/react-query'

import { getTransactions } from '../services/transactions'
import { DashboardPanel } from './DashboardPanel'
import { KpiCards } from './KpiCards'

export default function DashboardClient() {
  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div className="mx-auto flex w-full flex-col gap-6">
        <KpiCards />

        <DashboardPanel />
      </div>
    </>
  )
}
