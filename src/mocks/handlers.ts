import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/transactions', () => {
    const transactions = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Transação ${i + 1}`,
      amount: Math.floor(Math.random() * 5000),
      date: new Date().toISOString(),
      type: i % 2 === 0 ? 'deposit' : 'withdraw',
    }))

    return HttpResponse.json(transactions)
  }),
]
