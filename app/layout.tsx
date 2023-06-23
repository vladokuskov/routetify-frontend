import { siteConfig } from '@/config/site'
import { NextThemeProvider } from '@/providers/ThemeProvider'
import { Providers } from '@/redux/provider'
import '@/styles/globals.css'
import 'leaflet/dist/leaflet.css'
import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['Routetify', 'Bike', 'Route', 'GPX', 'KML'],
  authors: [
    {
      name: 'swappnet',
      url: 'https://vladokuskov.xyz/',
    },
  ],
  creator: 'swappnet',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f6f6' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
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
      <body className={`${roboto.variable}`} suppressHydrationWarning={true}>
        <Toaster
          toastOptions={{
            className: 'font-roboto font-semibold',
            position: 'top-center',
            style: {
              padding: '.5rem',
              color: '#f4f4f4',
            },
            success: {
              style: {
                background: 'green',
              },
            },
            error: {
              style: {
                background: '#ef4444',
                opacity: '70%',
              },
            },
          }}
        />
        <NextThemeProvider>
          <Providers>{children}</Providers>
        </NextThemeProvider>
      </body>
    </html>
  )
}
