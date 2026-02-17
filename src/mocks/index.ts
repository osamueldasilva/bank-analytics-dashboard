export async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen()
    return
  }

  const { worker } = await import('./browser')
  await worker.start({ onUnhandledRequest: 'bypass' })

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible') {
        await worker.start({ onUnhandledRequest: 'bypass' })
      }
    })
  }
}
