/**
 * Simulates network latency to maintain realistic behavior in a frontend-only environment.
 * @param minMs Minimum delay in milliseconds (default: 400)
 * @param maxMs Maximum delay in milliseconds (default: 1000)
 */
export function simulateLatency(minMs = 400, maxMs = 1000): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return new Promise((resolve) => setTimeout(resolve, delay))
}
