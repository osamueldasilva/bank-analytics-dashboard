'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { Permission, UserRole } from '@/src/types'

import { hasPermission } from './auth.config'
import { getStoredRole, saveStoredRole } from './auth.storage'

type AuthContextValue = {
  role: UserRole
  setRole: (nextRole: UserRole) => void
  can: (permission: Permission) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState<UserRole>(() => getStoredRole() ?? 'Admin')

  useEffect(() => {
    saveStoredRole(role)
  }, [role])

  const can = useCallback(
    (permission: Permission) => {
      return hasPermission(role, permission)
    },
    [role],
  )

  const value = useMemo(
    () => ({
      role,
      setRole,
      can,
    }),
    [role, can],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
