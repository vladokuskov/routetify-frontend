import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

export const metadata = { title: `${siteConfig.name} - Not found` }

export default function NotFound() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen p-2">
      <h1 className="font-roboto text-title font-bold">
        Ooops, page not found
      </h1>
      <p className="max-w-md font-roboto text-paragraph font-semibold">
        It looks like you`ve ventured off the beaten path. The page you`re
        trying to access doesn`t exist. Don`t worry; it happens to the best of
        us.
      </p>
      <Link href="/" passHref>
        <Button variant="secondary" aria-label="Back to Homepage">
          Back to Homepage
        </Button>
      </Link>
    </main>
  )
}
