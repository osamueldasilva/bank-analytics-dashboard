import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get(`/api/kpis`, () => {
    return HttpResponse.json([
      {
        id: '1',
        label: 'netExposure',
        value: 842300000,
        variation: 2.6,
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

  http.get(`/api/portfolio-trend`, () => {
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

  http.get(`/api/liquidity`, () => {
    return HttpResponse.json([
      { segment: 'Retail', value: 420000000, percentage: 42 },
      { segment: 'Corporate', value: 370000000, percentage: 37 },
      { segment: 'SME', value: 210000000, percentage: 21 },
    ])
  }),

  http.get(`/api/credit-exposure`, () => {
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

  http.get(`/api/fraud-overview`, () => {
    return HttpResponse.json({
      flaggedTransactions: 1284,
      underInvestigation: 312,
      resolvedLast30d: 972,
      fraudRate: 0.14,
    })
  }),

  http.get(`/api/risk-events`, ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')

    const types = ['Credit', 'Fraud', 'Liquidity']
    const segments = ['Corporate', 'Retail', 'SME']
    const statuses = ['Open', 'Closed', 'Monitoring']

    const allRiskEvents = Array.from({ length: 100 }, (_, i) => {
      const idNumber = 4821 - i
      const randomExposure = Math.floor(Math.random() * 5000000) + 100000
      const date = new Date()
      date.setDate(date.getDate() - i)

      return {
        id: `RISK-${idNumber}`,
        type: types[Math.floor(Math.random() * types.length)],
        segment: segments[Math.floor(Math.random() * segments.length)],
        exposure: randomExposure,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: date.toISOString().split('T')[0],
      }
    })

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedItems = allRiskEvents.slice(startIndex, endIndex)

    return HttpResponse.json({
      items: paginatedItems,
      totalItems: allRiskEvents.length,
      totalPages: Math.ceil(allRiskEvents.length / limit),
      currentPage: page,
    })
  }),
]
