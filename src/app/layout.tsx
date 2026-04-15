import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'HR Management Portal',
  description: 'Enterprise HR management system for workforce analytics and employee management',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}