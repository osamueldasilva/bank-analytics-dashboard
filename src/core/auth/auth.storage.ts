import type { UserRole } from '@/src/types'

import { userRoleSchema } from './auth.schema'

const STORAGE_KEY = 'bankops:auth:role'

export function getStoredRole(): UserRole | null {
  if (typeof window === 'undefined') return null

  const value = localStorage.getItem(STORAGE_KEY)
  if (!value) return null

  const result = userRoleSchema.safeParse(value)
  return result.success ? result.data : null
}

export function saveStoredRole(role: UserRole) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, role)
}
