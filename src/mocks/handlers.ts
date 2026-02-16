import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/kpis', () => {
    return HttpResponse.json([
      {
        id: '1',
        label: 'netExposure',
        value: 842300000,
        variation: 2.4,
        trend: 'up',
      },
      {
        id: '2',
        label: 'liquidityRatio',
        value: 128,
        variation: -0.8,
        trend: 'down',
      },
      {
        id: '3',
        label: 'creditRiskIndex',
        value: 3.42,
        variation: 0.12,
        trend: 'up',
      },
      {
        id: '4',
        label: 'fraudAlerts',
        value: 184,
        variation: -6.1,
        trend: 'down',
      },
      {
        id: '5',
        label: 'portfolioPerformance',
        value: 7.8,
        variation: 1.2,
        trend: 'up',
      },
    ])
  }),

  http.get('/api/portfolio-trend', () => {
    const points = Array.from({ length: 90 }).map((_, i) => {
      const date = new Date(2026, 0, 1)
      date.setDate(date.getDate() + i)
      return {
        date: date.toISOString().split('T')[0],
        exposure: 800 + Math.random() * 50,
        riskIndex: 3 + Math.random(),
        performance: 7 + Math.random(),
      }
    })
    return HttpResponse.json(points)
  }),

  http.get('/api/liquidity', () => {
    return HttpResponse.json([
      { segment: 'Retail', value: 420000000, percentage: 42 },
      { segment: 'Corporate', value: 370000000, percentage: 37 },
      { segment: 'SME', value: 210000000, percentage: 21 },
    ])
  }),

  http.get('/api/credit-exposure', () => {
    return HttpResponse.json([
      {
        sector: 'Real Estate',
        exposure: 250000000,
        riskScore: 4.2,
        percentageOfPortfolio: 30,
      },
      {
        sector: 'Energy',
        exposure: 180000000,
        riskScore: 3.8,
        percentageOfPortfolio: 22,
      },
      {
        sector: 'Technology',
        exposure: 210000000,
        riskScore: 2.9,
        percentageOfPortfolio: 25,
      },
      {
        sector: 'Healthcare',
        exposure: 192300000,
        riskScore: 3.1,
        percentageOfPortfolio: 23,
      },
    ])
  }),

  http.get('/api/fraud-overview', () => {
    return HttpResponse.json({
      flaggedTransactions: 1284,
      underInvestigation: 312,
      resolvedLast30d: 972,
      fraudRate: 0.14,
    })
  }),

  http.get('/api/risk-events', () => {
    return HttpResponse.json([
      {
        id: 'RISK-4821',
        type: 'Credit',
        segment: 'Corporate',
        exposure: 2100000,
        status: 'Open',
        date: '2026-02-10',
      },
      {
        id: 'RISK-4820',
        type: 'Fraud',
        segment: 'Retail',
        exposure: 480000,
        status: 'Closed',
        date: '2026-02-09',
      },
      {
        id: 'RISK-4819',
        type: 'Liquidity',
        segment: 'SME',
        exposure: 1200000,
        status: 'Monitoring',
        date: '2026-02-08',
      },
      {
        id: 'RISK-4818',
        type: 'Credit',
        segment: 'Retail',
        exposure: 950000,
        status: 'Closed',
        date: '2026-02-07',
      },
      {
        id: 'RISK-4817',
        type: 'Fraud',
        segment: 'SME',
        exposure: 320000,
        status: 'Open',
        date: '2026-02-06',
      },
      {
        id: 'RISK-4816',
        type: 'Liquidity',
        segment: 'Corporate',
        exposure: 5400000,
        status: 'Monitoring',
        date: '2026-02-05',
      },
    ])
  }),
]
