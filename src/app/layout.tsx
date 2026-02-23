import '../styles/globals.css'

import type { Metadata } from 'next'
import { IBM_Plex_Mono, Inter } from 'next/font/google'

import { AppSidebar } from '@/components/AppSidebar'
import { Header } from '@/components/Header'
import { RoutePermissionGuard } from '@/src/shared/components/RoutePermissionGuard'

import { Providers } from './providers'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const interMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BankOps Analytics Dashboard',
  description: 'Data analytics dashboard for banking operations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${interMono.variable} font-sans antialiased`}
      >
        <Providers>
          <RoutePermissionGuard>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 overflow-y-auto px-12 py-6">
                  {children}
                </main>
              </div>
            </div>
          </RoutePermissionGuard>
        </Providers>
      </body>
    </html>
  )
}
