import type { KpiValueType } from '@/src/types'

import { formatCurrency } from './dashboard.transform'

export function formatKpiValueByType(
  value: number,
  type: KpiValueType,
): string {
  switch (type) {
    case 'currency':
      return formatCurrency(value)
    case 'percentage':
      return `${value.toFixed(2)}%`
    case 'score':
      return value.toFixed(2)
    default:
      return value.toFixed(2)
  }
}
