import React from 'react'
import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'

import Header from '@/app/_components/Header'
import '@/app/_styles/globals.css'
import ReservationProvider from '@/app/_components/ReservationContext'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description: 'A place to relax and enjoy the great outdoors.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} flex min-h-screen flex-col bg-primary-950 text-primary-100`}>
        <Header />

        <div className="flex-1 px-8 py-12">
          <main className="mx-auto grid w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
