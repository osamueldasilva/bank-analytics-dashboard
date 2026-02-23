import type { KpiBehavior } from '@/src/types/kpi.types'

interface DataPoint {
  value: number
}

interface ComparisonInput {
  currentPoints: DataPoint[]
  previousPoints: DataPoint[]
}

interface ComparisonResult {
  current: number
  previous: number
  variationAbsolute: number
  variationPercent: number
  bestPoint: number
  worstPoint: number
  behavior: KpiBehavior
}

export function calculateKpiComparison({
  currentPoints,
  previousPoints,
}: ComparisonInput): ComparisonResult {
  const current = currentPoints.at(-1)?.value ?? 0
  const previous = previousPoints.at(-1)?.value ?? 0

  const variationAbsolute = parseFloat((current - previous).toFixed(2))
  const variationPercent =
    previous !== 0
      ? parseFloat((((current - previous) / previous) * 100).toFixed(2))
      : 0

  const values = currentPoints.map((item) => item.value)
  const bestPoint = values.length ? Math.max(...values) : 0
  const worstPoint = values.length ? Math.min(...values) : 0

  const behavior = classifyBehavior(values, variationPercent)

  return {
    current,
    previous,
    variationAbsolute,
    variationPercent,
    bestPoint,
    worstPoint,
    behavior,
  }
}

export function classifyBehavior(
  values: number[],
  variationPercent: number,
): KpiBehavior {
  if (values.length === 0) return 'stable'

  const mean = values.reduce((acc, v) => acc + v, 0) / values.length
  const variance =
    values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / values.length
  const stdDev = Math.sqrt(variance)
  const volatilityRatio = mean !== 0 ? stdDev / mean : 0

  if (volatilityRatio > 0.25) return 'volatile'
  if (variationPercent > 1) return 'growing'
  if (variationPercent < -1) return 'deteriorating'
  return 'stable'
}
