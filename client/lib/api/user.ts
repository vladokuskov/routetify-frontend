import { Envs } from '@/config'
import { User } from '@/types/global/user.types'
import axios from 'axios'

type AuthMethod = 'login' | 'register'

type Credentials = {
  email: string
  password: string
}

const auth = async (method: AuthMethod, credentials: Credentials) => {
  try {
    const response = await axios.post(
      `${Envs.ORIGIN}/auth/${method}`,
      credentials,
      { withCredentials: true },
    )

    if (response.status === 200) {
      return true
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        throw new Error(err.response.data.message)
      } else if (err.code === 'ERR_NETWORK') {
        throw new Error(
          'Failed to connect to the server. Please try again later.',
        )
      }
    } else if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

const logout = async () => {
  try {
    axios.defaults.withCredentials = true

    const response = await axios.post(`${Envs.ORIGIN}/auth/logout`)

    if (response) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

const getUser = async () => {
  try {
    axios.defaults.withCredentials = true

    const response = await axios.get(`${Envs.ORIGIN}/user`, {
      withCredentials: true,
    })

    if (response.status === 200) {
      const data = response.data.user as User

      return data
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

export { logout, auth, getUser }
