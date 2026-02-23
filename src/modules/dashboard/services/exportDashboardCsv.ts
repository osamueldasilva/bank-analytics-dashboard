import { dashboardApi } from '@/src/core/api/dashboard.api'
import type {
  CreditExposureSector,
  DashboardExportData,
  FraudOverview,
  KpiMetric,
  LiquiditySegment,
  PortfolioTrendPoint,
  RiskEvent,
} from '@/src/types/dashboard.types'

import type { DashboardFilters } from '../types/dashboard.filters'
import { arrayToCsv, buildSectionedCsv, csvToBlob } from '../utils/csv.utils'
import { mapKpiLabelToDisplay } from '../utils/dashboard.transform'

async function fetchExportData(
  filters: DashboardFilters,
): Promise<DashboardExportData> {
  return dashboardApi.fetchDashboardExport(filters)
}

function buildKpisCsv(kpis: KpiMetric[]): string {
  return arrayToCsv(kpis, [
    { header: 'Metric', accessor: (r) => mapKpiLabelToDisplay(r.label) },
    { header: 'Value', accessor: (r) => r.value, format: 'number' },
    {
      header: 'Previous Value',
      accessor: (r) => r.previousValue,
      format: 'number',
    },
    { header: 'Delta (%)', accessor: (r) => r.delta, format: 'percentage' },
    { header: 'Trend', accessor: (r) => r.trend },
  ])
}

function buildPortfolioTrendCsv(points: PortfolioTrendPoint[]): string {
  return arrayToCsv(points, [
    { header: 'Date', accessor: (r) => r.date, format: 'date' },
    { header: 'Exposure', accessor: (r) => r.exposure, format: 'number' },
    {
      header: 'Risk Index',
      accessor: (r) => r.riskIndex,
      format: 'number',
    },
    {
      header: 'Performance',
      accessor: (r) => r.performance,
      format: 'percentage',
    },
  ])
}

function buildLiquidityCsv(segments: LiquiditySegment[]): string {
  return arrayToCsv(segments, [
    { header: 'Segment', accessor: (r) => r.segment },
    { header: 'Value', accessor: (r) => r.value, format: 'currency' },
    {
      header: 'Percentage',
      accessor: (r) => r.percentage,
      format: 'percentage',
    },
  ])
}

function buildCreditExposureCsv(sectors: CreditExposureSector[]): string {
  return arrayToCsv(sectors, [
    { header: 'Sector', accessor: (r) => r.sector },
    { header: 'Exposure', accessor: (r) => r.exposure, format: 'currency' },
    {
      header: 'Risk Score',
      accessor: (r) => r.riskScore,
      format: 'number',
    },
    {
      header: '% of Portfolio',
      accessor: (r) => r.percentageOfPortfolio,
      format: 'percentage',
    },
  ])
}

function buildFraudOverviewCsv(fraud: FraudOverview): string {
  return arrayToCsv(
    [fraud],
    [
      {
        header: 'Flagged Transactions',
        accessor: (r) => r.flaggedTransactions,
        format: 'number',
      },
      {
        header: 'Under Investigation',
        accessor: (r) => r.underInvestigation,
        format: 'number',
      },
      {
        header: 'Resolved (30d)',
        accessor: (r) => r.resolvedLast30d,
        format: 'number',
      },
      {
        header: 'Fraud Rate',
        accessor: (r) => r.fraudRate,
        format: 'percentage',
      },
    ],
  )
}

function buildRiskEventsCsv(events: RiskEvent[]): string {
  return arrayToCsv(events, [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Type', accessor: (r) => r.type },
    { header: 'Segment', accessor: (r) => r.segment },
    { header: 'Exposure', accessor: (r) => r.exposure, format: 'currency' },
    { header: 'Status', accessor: (r) => r.status },
    { header: 'Date', accessor: (r) => r.date, format: 'date' },
  ])
}

function buildExportFilename(filters: DashboardFilters): string {
  const timestamp = new Date().toISOString().split('T')[0]
  const segment = filters.segment.toLowerCase()
  return `dashboard-${filters.period}-${segment}-${timestamp}.csv`
}

export async function exportDashboardCsv(filters: DashboardFilters): Promise<{
  blob: Blob
  filename: string
}> {
  const data = await fetchExportData(filters)

  const csvContent = buildSectionedCsv([
    { title: 'KPIs', csv: buildKpisCsv(data.kpis) },
    {
      title: 'Portfolio Trend',
      csv: buildPortfolioTrendCsv(data.portfolioTrend),
    },
    {
      title: 'Liquidity Distribution',
      csv: buildLiquidityCsv(data.liquidity),
    },
    {
      title: 'Credit Exposure',
      csv: buildCreditExposureCsv(data.creditExposure),
    },
    { title: 'Fraud Overview', csv: buildFraudOverviewCsv(data.fraudOverview) },
    {
      title: `Risk Events (${data.riskEvents.length} total)`,
      csv: buildRiskEventsCsv(data.riskEvents),
    },
  ])

  return {
    blob: csvToBlob(csvContent),
    filename: buildExportFilename(filters),
  }
}
