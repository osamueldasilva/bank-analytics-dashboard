import { delay, http, HttpResponse } from 'msw'

const getRandom = (base: number, range: number) =>
  base + (Math.random() * range - range / 2)

const randomDelay = () => Math.floor(Math.random() * 6900) + 100

export const handlers = [
  http.get(`/api/kpis`, async () => {
    await delay(randomDelay())

    return HttpResponse.json([
      {
        id: '1',
        label: 'netExposure',
        value: Math.floor(getRandom(842300000, 50000000)),
        variation: parseFloat(getRandom(2.6, 1).toFixed(1)),
        trend: Math.random() > 0.5 ? 'up' : 'down',
      },
      {
        id: '2',
        label: 'liquidityRatio',
        value: Math.floor(getRandom(128, 10)),
        variation: parseFloat(getRandom(-0.8, 0.5).toFixed(1)),
        trend: Math.random() > 0.5 ? 'up' : 'down',
      },
      {
        id: '3',
        label: 'creditRiskIndex',
        value: parseFloat(getRandom(3.42, 0.5).toFixed(2)),
        variation: parseFloat(getRandom(0.12, 0.05).toFixed(2)),
        trend: 'up',
      },
      {
        id: '4',
        label: 'fraudAlerts',
        value: Math.floor(getRandom(184, 40)),
        variation: parseFloat(getRandom(-6.1, 2).toFixed(1)),
        trend: 'down',
      },
      {
        id: '5',
        label: 'portfolioPerformance',
        value: parseFloat(getRandom(7.8, 1.5).toFixed(1)),
        variation: parseFloat(getRandom(1.2, 0.4).toFixed(1)),
        trend: 'up',
      },
    ])
  }),

  http.get(`/api/portfolio-trend`, async () => {
    await delay(randomDelay())

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

  http.get(`/api/liquidity`, async () => {
    await delay(randomDelay())

    const v1 = Math.floor(getRandom(420000000, 100000000))
    const v2 = Math.floor(getRandom(370000000, 80000000))
    const v3 = Math.floor(getRandom(210000000, 50000000))
    const total = v1 + v2 + v3

    return HttpResponse.json([
      {
        segment: 'Retail',
        value: v1,
        percentage: Math.round((v1 / total) * 100),
      },
      {
        segment: 'Corporate',
        value: v2,
        percentage: Math.round((v2 / total) * 100),
      },
      { segment: 'SME', value: v3, percentage: Math.round((v3 / total) * 100) },
    ])
  }),

  http.get(`/api/credit-exposure`, async () => {
    await delay(randomDelay())

    const sectors = ['Real Estate', 'Energy', 'Technology', 'Healthcare']
    const data = sectors.map((sector) => {
      const exposure = Math.floor(getRandom(200000000, 100000000))
      return {
        sector,
        exposure,
        riskScore: parseFloat((2 + Math.random() * 3).toFixed(1)),
        percentageOfPortfolio: 0,
      }
    })

    const totalExposure = data.reduce((acc, item) => acc + item.exposure, 0)
    return HttpResponse.json(
      data.map((item) => ({
        ...item,
        percentageOfPortfolio: Math.round(
          (item.exposure / totalExposure) * 100,
        ),
      })),
    )
  }),

  http.get(`/api/fraud-overview`, async () => {
    await delay(randomDelay())

    return HttpResponse.json({
      flaggedTransactions: Math.floor(getRandom(1284, 300)),
      underInvestigation: Math.floor(getRandom(312, 100)),
      resolvedLast30d: Math.floor(getRandom(972, 200)),
      fraudRate: parseFloat((0.1 + Math.random() * 0.1).toFixed(2)),
    })
  }),

  http.get(`/api/risk-events`, async ({ request }) => {
    await delay(randomDelay())

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
