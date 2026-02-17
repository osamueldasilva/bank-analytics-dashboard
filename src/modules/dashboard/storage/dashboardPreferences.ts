import { UserPreferences } from '../types/userPreferences'

const STORAGE_KEY = 'dashboard-user-preferences'

export function getPreferences(): UserPreferences | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return null
  try {
    const parsed = JSON.parse(data)
    if (parsed.version !== 1) return null
    return parsed
  } catch {
    return null
  }
}

export function savePreferences(preferences: Omit<UserPreferences, 'version'>) {
  if (typeof window === 'undefined') return
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...preferences, version: 1 }),
  )
}

export function clearPreferences() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
