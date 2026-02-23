import { ReadonlyURLSearchParams } from 'next/navigation'

/**
 * Generates the KPI navigation URL while preserving the current searchParams.
 * @param kpiId - The KPI identifier string
 * @param searchParams - An instance of ReadonlyURLSearchParams
 * @returns The navigation URL string
 */
export function buildKpiUrl(
  kpiId: string,
  searchParams: ReadonlyURLSearchParams,
): string {
  const params = searchParams.toString()
  return `/dashboard/kpi/${encodeURIComponent(kpiId)}${params ? `?${params}` : ''}`
}
