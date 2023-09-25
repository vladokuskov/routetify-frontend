import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'
import { login, register } from './auth.service'
import ServerError from 'core/instances/ServerError'
import { serialize } from 'cookie'
import config from 'config'

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await register(email, password)

    if (result) {
      return res.setHeader('Set-Cookie', result.token).status(OK).json({
        message: 'User successfully registered',
      })
    } else {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: 'Something happened during user registration. Try again later',
      })
    }
  } catch (error) {
    if (error instanceof ServerError) {
      return res.status(error.status).json({ message: error.message })
    } else if (error instanceof Error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
  }
}
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await login(email, password)

    if (result) {
      return res.setHeader('Set-Cookie', result.token).status(OK).json({
        message: 'User successfully logged in',
      })
    } else {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: 'Something happened during login. Try again later',
      })
    }
  } catch (error) {
    if (error instanceof ServerError) {
      return res.status(error.status).json({ message: error.message })
    } else if (error instanceof Error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
  }
}

const logoutUser = async (req: Request, res: Response) => {
  try {
    const serialized = serialize('token', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: -1,
      path: '/',
    })

    return res.setHeader('Set-Cookie', serialized).status(OK).json({
      message: 'Logged out',
    })
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
    }
  }
}

export { loginUser, logoutUser, registerUser }
