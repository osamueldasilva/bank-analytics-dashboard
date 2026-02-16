'use client'

import { useQuery } from '@tanstack/react-query'

import { Card } from '@/components/ui/card'

import { getTransactions } from '../services/transactions'
import { KpiCard } from './KpiCard'

export default function DashboardClient() {
  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div className="mx-auto flex w-full flex-col gap-6">
        <KpiCard />

        <div className="grid grid-cols-12 gap-4">
          <Card
            className="col-span-8 flex h-48 items-center justify-center"
            style={{ minWidth: 0 }}
          ></Card>
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
      </div>
    </>
  )
}
