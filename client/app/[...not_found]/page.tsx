import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

export const metadata = { title: `${siteConfig.name} - Not found` }

export default function NotFound() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="font-roboto text-neutral-900 font-bold">
        Ooops, page not found
      </h1>
      <p className="max-w-md font-roboto text-neutral-500 font-semibold">
        It looks like you`ve ventured off the beaten path. The page you`re
        trying to access doesn`t exist. Don`t worry; it happens to the best of
        us.
      </p>
      <Link href="/" passHref>
        <Button variant="default" aria-label="Back to Homepage">
          Default
        </Button>
      </Link>
      <Button variant="destructive" aria-label="Back to Homepage">
        Destructive
      </Button>
      <Button variant="ghost" aria-label="Back to Homepage">
        Ghost
      </Button>
      <Button variant="secondary" aria-label="Back to Homepage">
        Secondary
      </Button>
      <Button variant="link" aria-label="Back to Homepage">
        Link
      </Button>
      <Button variant="outline" aria-label="Back to Homepage">
        Outline
      </Button>
      <Button variant="map" aria-label="Back to Homepage">
        Map
      </Button>
    </main>
  )
}
