export const USER_ROLES = ['Admin', 'Analyst', 'Viewer'] as const

export const PERMISSIONS = {
  dashboardAccess: 'nav:dashboard',
  riskEventsAccess: 'nav:riskEvents',
  settingsAccess: 'nav:settings',
  dashboardExportCsv: 'dashboard:exportCsv',
  dashboardView: 'dashboard:view',
} as const

export const ROUTE_PERMISSIONS = {
  '/dashboard': PERMISSIONS.dashboardAccess,
  '/risk-events': PERMISSIONS.riskEventsAccess,
  '/settings': PERMISSIONS.settingsAccess,
} as const
