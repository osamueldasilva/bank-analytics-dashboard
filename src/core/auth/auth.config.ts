import { PERMISSIONS } from '@/src/constants'
import type { Permission, RoleMeta, UserRole } from '@/src/types'

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  Admin: [
    PERMISSIONS.dashboardAccess,
    PERMISSIONS.riskEventsAccess,
    PERMISSIONS.settingsAccess,
    PERMISSIONS.dashboardView,
    PERMISSIONS.dashboardExportCsv,
  ],
  Analyst: [
    PERMISSIONS.dashboardAccess,
    PERMISSIONS.riskEventsAccess,
    PERMISSIONS.dashboardView,
  ],
  Viewer: [PERMISSIONS.dashboardAccess, PERMISSIONS.dashboardView],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission)
}

export const ROLE_META: Record<UserRole, RoleMeta> = {
  Admin: {
    name: 'Admin BankOps',
    email: 'admin@bankops.com.br',
  },
  Analyst: {
    name: 'Analyst BankOps',
    email: 'analyst@bankops.com.br',
  },
  Viewer: {
    name: 'Viewer BankOps',
    email: 'viewer@bankops.com.br',
  },
}
