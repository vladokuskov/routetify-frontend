import { Toaster } from '@/components/Toaster/Toaster'
import { siteConfig } from '@/config/site'
import { StoreProvider } from '@/providers/StoreProvider'
import { NextThemeProvider } from '@/providers/ThemeProvider'
import '@/styles/globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['Routetify', 'Bike', 'Route', 'GPX', 'KML'],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#141414' },
  ],
  icons: {
    icon: [
      { url: '/favicon-16x16.png' },
      new URL('/favicon-16x16.png', siteConfig.url),
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
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
        <Toaster />
        <NextThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}
