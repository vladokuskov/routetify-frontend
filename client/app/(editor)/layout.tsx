import 'leaflet/dist/leaflet.css'
import { siteConfig } from '@/config/site'

export const metadata = { title: `${siteConfig.name} - Editor` }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}
