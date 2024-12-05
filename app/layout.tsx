import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import NavMenu from '@/components/layout/nav-menu'

export const metadata: Metadata = {
  title: 'PUTA - Pantnagar Union of Teachers Association',
  description: 'Official website of Pantnagar Union of Teachers Association',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <NavMenu />
          <main className="flex-1 bg-white">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

