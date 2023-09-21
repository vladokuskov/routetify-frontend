import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, NOT_ACCEPTABLE, OK } from 'http-status'
import { register } from './auth.service'
import ServerError from 'core/instances/ServerError'

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await register(email, password)

    if (result) {
      res.status(OK).json({ message: 'User registered.' })
    }
  } catch (error) {
    if (error instanceof ServerError) {
      res.status(error.status).json({ message: error.message })
    } else if (error instanceof Error) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
    }
  }
}
const loginUser = async (req: Request, res: Response) => {
  try {
    const body = req.body

    if (!body.email || !body.password) {
      res
        .status(NOT_ACCEPTABLE)
        .json({ message: 'Provide email and password for login.' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
    }
  }
}

const logoutUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
    }
  }
}

export { loginUser, logoutUser, registerUser }
