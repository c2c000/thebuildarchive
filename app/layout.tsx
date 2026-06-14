import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ContentProvider } from '@/lib/content-context'
import { ColorSchemeProvider } from '@/components/color-scheme-provider'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'The Build Archive | Rethinking Access to Engineering',
  description:
    'A multimedia passion project investigating engineering access, identity, and the broken entry point into STEM.',
  keywords: ['STEM', 'engineering', 'education', 'access', 'inequality', 'diversity', 'build archive'],
  openGraph: {
    title: 'The Build Archive',
    description: 'Engineering is creative. But not everyone gets in.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#f9f8f6',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ContentProvider>
          <ColorSchemeProvider>
            {children}
          </ColorSchemeProvider>
        </ContentProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
