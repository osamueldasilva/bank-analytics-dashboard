export const USER_ROLES = ['Admin', 'Analyst', 'Viewer'] as const

export const PERMISSIONS = {
  dashboardExportCsv: 'dashboard:exportCsv',
  dashboardView: 'dashboard:view',
} as const
