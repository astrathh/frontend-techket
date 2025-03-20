import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'Techket APP',
  description: 'Created with Next.js',
  generator: 'Victor Astrath',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
