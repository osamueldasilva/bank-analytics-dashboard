export const SEGMENTS = ['Retail', 'Corporate', 'SME'] as const
export const SEGMENT_OPTIONS = ['All', ...SEGMENTS] as const

export const PERIODS = ['7d', '30d', '90d'] as const
export const DEFAULT_PERIOD = '30d' as const

export const PERIOD_DAYS_MAP: Record<string, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
} as const

export const RISK_TYPES = ['Credit', 'Fraud', 'Liquidity'] as const
export const RISK_TYPE_OPTIONS = ['All', ...RISK_TYPES] as const

export const RISK_STATUSES = ['Open', 'Monitoring', 'Closed'] as const
export const STATUS_OPTIONS = ['All', ...RISK_STATUSES] as const

export const CREDIT_EXPOSURE_SECTORS = [
  'Real Estate',
  'Energy',
  'Technology',
  'Healthcare',
] as const

export const CURRENCY_LOCALE = 'en-US'
export const CURRENCY_CODE = 'USD'
