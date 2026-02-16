export async function getTransactions() {
  const res = await fetch('http://localhost:3000/api/transactions', {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch transactions')
  }

  return res.json()
}
