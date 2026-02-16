export async function getTransactions() {
  const res = await fetch('/transactions', {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch transactions')
  }

  return res.json()
}
