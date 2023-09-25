'use client'

import { getUser } from '@/lib/api/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getUserStatus = async () => {
    const isLogged = await getUser()

    if (isLogged) {
      router.push('/')
    } else {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getUserStatus()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full mt-4">
        <div className="px-3 py-1 text-xs font-medium text-center text-muted-foreground rounded-full animate-pulse bg-muted">
          loading...
        </div>
      </div>
    )
  }

  return <main>{children}</main>
}
