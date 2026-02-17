'use client'

import { useMutation } from '@tanstack/react-query'

import { exportDashboardCsv } from '../services/exportDashboardCsv'
import { useDashboardFilters } from './useDashboardFilters'

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()

  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export function useExportDashboardCsv() {
  const { filters } = useDashboardFilters()

  const mutation = useMutation({
    mutationKey: ['dashboard', 'export', filters],
    mutationFn: async () => {
      const { blob, filename } = await exportDashboardCsv(filters)
      triggerDownload(blob, filename)
    },
  })

  return {
    exportCsv: mutation.mutate,
    isExporting: mutation.isPending,
    exportError: mutation.error,
  }
}
