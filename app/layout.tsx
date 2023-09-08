import { siteConfig } from '@/config/site'
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
  authors: [
    {
      name: 'swappnet',
      url: 'https://vladokuskov.xyz/',
    },
  ],
  creator: 'swappnet',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f6f6' },
    { media: '(prefers-color-scheme: dark)', color: '#262626' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: '',
  },
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
        {children}
      </body>
    </html>
  )
}
