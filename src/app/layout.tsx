import '../styles/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { AppSidebar } from '@/components/AppSidebar'

import { Providers } from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BankOps Analytics Dashboard',
  description: 'Dashboard de análise de dados para operações bancárias',
}

if (process.env.NODE_ENV === 'development') {
  const { initMocks } = await import('../mocks')
  await initMocks()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AppSidebar />
          <main className="h-screen w-full p-6">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
