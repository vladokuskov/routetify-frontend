'use client'

import { getUser } from '@/lib/api/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getUserStatus = async () => {
    try {
      const isLogged = await getUser()

      if (isLogged) {
        router.push('/')
      } else {
        setIsLoading(false)
      }
    } catch (err) {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getUserStatus()
  }, [])

  if (isLoading) {
    return (
      <main className="w-full h-full min-h-screen p-4 flex items-start justify-center">
        <div className="flex items-center justify-center w-full mt-4">
          <div className="px-3 py-1 text-xs font-medium text-center text-muted-foreground rounded-full animate-pulse bg-background/80">
            loading...
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full h-full min-h-screen p-4 flex items-start justify-center pt-12">
      {children}
    </main>
  )
}
