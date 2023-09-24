'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { auth } from '@/lib/api/user'

export default function Login() {
  const router = useRouter()
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setLoginState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await auth('login', loginState)

      if (response) router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
    }
  }

  return (
    <main>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            aria-label="Account email"
            name="email"
            onChange={handleInputChange}
            required
          />
          <Input
            type="password"
            aria-label="Account password"
            minLength={8}
            name="password"
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Log in</Button>
        </form>
        <Link href="/register">Don`t have an account? Register</Link>
      </div>
    </main>
  )
}
