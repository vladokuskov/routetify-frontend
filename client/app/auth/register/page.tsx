'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { auth } from '@/lib/api/user'
import { isAxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import clsx from 'clsx'

enum PasswordStrength {
  Empty,
  Week,
  Medium,
  Strong,
}

export default function Register() {
  const router = useRouter()
  const [registerState, setRegisterState] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(
    PasswordStrength.Empty,
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'password') {
      const newStrength = calculatePasswordStrength(value)
      setPasswordStrength(newStrength)
    }

    setRegisterState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      if (passwordStrength === PasswordStrength.Strong) {
        const response = await auth('register', registerState)

        if (response) router.push('/')
      }

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
      <h1 className="text-title font-semibold font-roboto">Registration</h1>
      <form
        onSubmit={handleRegistration}
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
            aria-label="Account password"
            minLength={8}
            name="password"
            onChange={handleInputChange}
            required
          />

          <p
            className={clsx(
              'font-semibold',
              passwordStrength === PasswordStrength.Week
                ? 'text-red-400'
                : passwordStrength === PasswordStrength.Medium
                ? 'text-yellow-400'
                : passwordStrength === PasswordStrength.Strong
                ? 'text-green-400'
                : 'text-muted-foreground',
            )}
          >
            {passwordStrength === PasswordStrength.Week
              ? 'Week'
              : passwordStrength === PasswordStrength.Medium
              ? 'Medium'
              : passwordStrength === PasswordStrength.Strong
              ? 'Strong'
              : 'Password strength'}
          </p>
          <div className="w-full flex items-center justify-center gap-2">
            <div
              className={clsx(
                'h-1 w-1/3',
                passwordStrength === PasswordStrength.Week
                  ? 'bg-red-400'
                  : 'bg-muted',
              )}
            />
            <div
              className={clsx(
                'h-1 w-1/3',
                passwordStrength === PasswordStrength.Medium
                  ? 'bg-yellow-400'
                  : 'bg-muted',
              )}
            />
            <div
              className={clsx(
                'h-1 w-1/3',
                passwordStrength === PasswordStrength.Strong
                  ? 'bg-green-400'
                  : 'bg-muted',
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          aria-label="Register an account"
          className="w-full min-w-full mt-2"
        >
          Register
        </Button>
      </form>
      <Link
        href="/auth/login"
        className="text-muted-foreground hover:underline"
      >
        Already have an account? Log in
      </Link>
    </div>
  )
}

const calculatePasswordStrength = (password: string) => {
  if (password.length === 0) {
    return PasswordStrength.Empty
  } else if (password.length < 8) {
    return PasswordStrength.Week
  } else if (
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length >= 8 &&
    /[a-z]/.test(password)
  ) {
    return PasswordStrength.Strong
  } else if (
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length >= 8
  ) {
    return PasswordStrength.Medium
  } else {
    return PasswordStrength.Week
  }
}

const strengthClasses = {
  [PasswordStrength.Week]: 'text-red-400 bg-red-400',
  [PasswordStrength.Medium]: 'text-yellow-400 bg-yellow-400',
  [PasswordStrength.Strong]: 'text-green-400 bg-green-400',
  default: 'text-muted-foreground bg-muted',
}

const strengthLabels = {
  [PasswordStrength.Week]: 'Week',
  [PasswordStrength.Medium]: 'Medium',
  [PasswordStrength.Strong]: 'Strong',
  default: 'Password strength',
}
