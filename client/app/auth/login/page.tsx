'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { auth } from '@/lib/api/user'
import { isAxiosError } from 'axios'

export default function Login() {
  const router = useRouter()
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setLoginState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const response = await auth('login', loginState)

      if (response) router.push('/')

      setIsLoading(false)
    } catch (err) {
      if (err instanceof Error || isAxiosError(err)) {
        toast.error(err.message)
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-background rounded-lg p-2 max-w-md flex flex-col items-center justify-start gap-4">
      <h1 className="text-title font-semibold font-roboto">Login</h1>
      <form
        onSubmit={handleLogin}
        className="w-4/5 flex flex-col items-center justify-start gap-2"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            aria-label="Account email"
            name="email"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            aria-label="Account password"
            minLength={8}
            name="password"
            onChange={handleInputChange}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          aria-label="Log in into account"
          className="w-full min-w-full mt-2"
        >
          Log in
        </Button>
      </form>
      <Link
        href="/auth/register"
        className="text-muted-foreground hover:underline"
      >
        Don`t have an account? Register
      </Link>
    </div>
  )
}
