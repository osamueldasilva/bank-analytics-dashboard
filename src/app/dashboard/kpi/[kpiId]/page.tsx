import { KpiPageClient } from '@/src/modules/dashboard/components/KpiPageClient'

export const metadata = {
  title: 'KPI Details | BankOps Analytics',
  description: 'Details and analysis of a specific banking dashboard KPI.',
}

export default async function KpiPage({
  params,
}: {
  params: Promise<{ kpiId: string }>
}) {
  const { kpiId } = await params

  return <KpiPageClient kpiId={kpiId} />
}
