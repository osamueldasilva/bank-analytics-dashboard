/**
 * Simulates network latency to maintain realistic behavior in a frontend-only environment.
 * @param minMs Minimum delay in milliseconds (default: 200)
 * @param maxMs Maximum delay in milliseconds (default: 800)
 */
export function simulateLatency(minMs = 200, maxMs = 800): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  return new Promise((resolve) => setTimeout(resolve, delay))
}
