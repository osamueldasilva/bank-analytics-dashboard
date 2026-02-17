'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'

import { SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

import { MswGate } from './MswGate'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  useEffect(() => {
    async function initMSW() {
      if (
        typeof window !== 'undefined' &&
        process.env.NEXT_PUBLIC_ENABLE_MSW === 'true'
      ) {
        const { worker } = await import('../mocks/browser')
        await worker.start({
          onUnhandledRequest: 'bypass',
        })
      }
      setMswReady(true)
    }
    initMSW()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <SidebarProvider defaultOpen={false}>
        <TooltipProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {!mswReady && process.env.NEXT_PUBLIC_ENABLE_MSW === 'true' ? (
              <MswGate />
            ) : (
              children
            )}
          </NextThemesProvider>
        </TooltipProvider>
      </SidebarProvider>
    </QueryClientProvider>
  )
}
