import { User } from '@components/auth/auth.interface'

export const getUser = async (email: string) => {
  const users: User[] = []

  const user = users.find((user) => user.email === email)

  if (user) {
    return user
  } else {
    return null
  }
}
