import ServerError from 'core/instances/ServerError'
import { validateEmail, validatePassword } from 'core/utils/validation'
import { NextFunction, Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, NOT_ACCEPTABLE } from 'http-status'

const validateAuthBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(NOT_ACCEPTABLE)
        .json({ message: 'Request missing email or password' })
    }

    const isEmailValid = await validateEmail(email)
    const isPasswordValid = await validatePassword(password)

    if (isEmailValid && isPasswordValid) {
      return next()
    }
  } catch (error) {
    if (error instanceof ServerError) {
      return res.status(error.status).json({ message: error.message })
    } else if (error instanceof Error) {
     return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }
}

export { validateAuthBody }
