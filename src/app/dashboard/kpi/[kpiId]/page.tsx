import { KpiPageClient } from '@/src/modules/dashboard/components/KpiPageClient'

export default async function KpiPage({
  params,
}: {
  params: Promise<{ kpiId: string }>
}) {
  const { kpiId } = await params

  return <KpiPageClient kpiId={kpiId} />
}
