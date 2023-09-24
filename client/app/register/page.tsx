'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { auth } from '@/lib/api/user'
import { useAppDispatch } from '@/redux/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function Register() {
  const router = useRouter()
  const [registerState, setRegisterState] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setRegisterState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await auth('register', registerState)

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
        <h1>Register</h1>
        <form onSubmit={handleRegistration}>
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
          <Button type="submit">Register</Button>
        </form>
        <Link href="/register">Already have an account? Log in</Link>
      </div>
    </main>
  )
}
