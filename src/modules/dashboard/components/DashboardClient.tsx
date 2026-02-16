'use client'

import { useQuery } from '@tanstack/react-query'

import { Card } from '@/components/ui/card'

import { getTransactions } from '../services/transactions'

export default function DashboardClient() {
  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <h1>Dashboard</h1>
      <Card>Bem-vindo à página do dashboard!</Card>
    </>
  )
}
