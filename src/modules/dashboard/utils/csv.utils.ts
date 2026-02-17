type CsvColumnDef<T> = {
  header: string
  accessor: (row: T) => string | number
  format?: 'currency' | 'percentage' | 'date' | 'number'
}

function escapeField(value: string): string {
  if (
    value.includes(',') ||
    value.includes('"') ||
    value.includes('\n') ||
    value.includes('\r')
  ) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function formatValue(
  value: string | number,
  format?: CsvColumnDef<unknown>['format'],
): string {
  if (value === null || value === undefined) return ''

  switch (format) {
    case 'currency':
      return typeof value === 'number'
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          }).format(value)
        : String(value)
    case 'percentage':
      return typeof value === 'number' ? `${value.toFixed(2)}%` : String(value)
    case 'date':
      return String(value)
    case 'number':
      return typeof value === 'number'
        ? new Intl.NumberFormat('en-US').format(value)
        : String(value)
    default:
      return String(value)
  }
}

export function arrayToCsv<T>(data: T[], columns: CsvColumnDef<T>[]): string {
  const headerRow = columns.map((col) => escapeField(col.header)).join(',')

  const dataRows = data.map((row) =>
    columns
      .map((col) => {
        const raw = col.accessor(row)
        const formatted = formatValue(raw, col.format)
        return escapeField(formatted)
      })
      .join(','),
  )

  return [headerRow, ...dataRows].join('\r\n')
}

export function buildSectionedCsv(
  sections: { title: string; csv: string }[],
): string {
  return sections
    .map((section) => `# ${section.title}\r\n${section.csv}`)
    .join('\r\n\r\n')
}

export function csvToBlob(csvContent: string): Blob {
  const BOM = '\uFEFF'
  return new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
}
