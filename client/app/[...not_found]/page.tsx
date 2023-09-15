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
      <Link
        href="/"
        className="p-1 px-2 bg-green-400 hocus:bg-green-300 active:!bg-green-400 transition-all rounded-md font-roboto font-semibold text-black"
        aria-label="Back to Homepage"
      >
        Back to Homepage
      </Link>
    </main>
  )
}
