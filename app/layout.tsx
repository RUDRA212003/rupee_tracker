import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'RupeeTracker – Smart Price & Expense Tracker',
    template: '%s | RupeeTracker',
  },
  description:
    'RupeeTracker helps you track product prices, monitor expenses, and save money on your online shopping.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'RupeeTracker – Smart Price & Expense Tracker',
    description:
      'Track product prices, manage expenses, and save money with RupeeTracker.',
    url: 'https://rupeetracker.vercel.app',
    siteName: 'RupeeTracker',
    type: 'website',
  },
  metadataBase: new URL('https://rupeetracker.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${spaceGrotesk.className}`}>
        <main className="max-w-10xl mx-auto">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
