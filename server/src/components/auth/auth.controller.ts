import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status'
import { login, register } from './auth.service'
import ServerError from 'core/instances/ServerError'
import { serialize } from 'cookie'

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await register(email, password)

    if (result) {
      res.setHeader('Set-Cookie', result.token)

      res.status(OK).json({ user: result.user })
    } else {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: 'Something happened during user registration. Try again later',
      })
    }
  } catch (error) {
    if (error instanceof ServerError) {
      res.status(error.status).json({ message: error.message })
    } else if (error instanceof Error) {
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
  }
}
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await login(email, password)

    if (result) {
      res.setHeader('Set-Cookie', result.token)

      res.status(OK).json({ user: result.user })
    } else {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: 'Something happened during login. Try again later',
      })
    }
  } catch (error) {
    if (error instanceof ServerError) {
      res.status(error.status).json({ message: error.message })
    } else if (error instanceof Error) {
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
  }
}

const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.cookie

    if (!token) {
      return res.status(UNAUTHORIZED).json({
        message: 'Unauthorized',
      })
    }

    const serialized = serialize('token', '', {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    })

    res.setHeader('Set-Cookie', serialized)
    res.status(OK).json({
      message: 'Logged out',
    })
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
    }
  }
}

export { loginUser, logoutUser, registerUser }
