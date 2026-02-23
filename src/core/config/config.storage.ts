import { AppConfig, DEFAULT_CONFIG, widgetConfigSchema } from './config.schema'

const STORAGE_KEY = 'bankops:app:config'

export function getStoredConfig(): AppConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG

  const value = localStorage.getItem(STORAGE_KEY)
  if (!value) return DEFAULT_CONFIG

  try {
    const parsed = JSON.parse(value)
    const result = widgetConfigSchema.safeParse(parsed)
    return result.success ? result.data : DEFAULT_CONFIG
  } catch {
    return DEFAULT_CONFIG
  }
}

export function saveStoredConfig(config: AppConfig) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}
