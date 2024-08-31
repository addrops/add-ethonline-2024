import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Dropvertise',
  description:
    'A platform for companies to create engaging social media posts to attract consumers instead of ads',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={clsx('antialiased scroll-smooth', inter.variable)}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
