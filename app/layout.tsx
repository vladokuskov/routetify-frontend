import { siteConfig } from '@/config/site'
import StyledComponentsRegistry from '@/lib/registry'
import { Providers } from '@/redux/provider'
import { Inter, Roboto } from 'next/font/google'

import 'leaflet/dist/leaflet.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['cycroute', 'Bike', 'Route', 'GPX', 'KML'],
  authors: [
    {
      name: 'swappnet',
      url: 'https://vladokuskov.xyz/',
    },
  ],
  creator: 'swappnet',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f6f6' },
    { media: '(prefers-color-scheme: dark)', color: '#f8f6f6' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${roboto.variable} ${inter.variable}`}
        suppressHydrationWarning={true}
      >
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
