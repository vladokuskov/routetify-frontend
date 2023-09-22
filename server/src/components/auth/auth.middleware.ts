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
      res.status(NOT_ACCEPTABLE)
      res.json({ message: 'Request missing email or password' })
    }

    const isEmailValid = await validateEmail(email)
    const isPasswordValid = await validatePassword(password)

    if (isEmailValid && isPasswordValid) {
      next()
    }
  } catch (error) {
    if (error instanceof ServerError) {
      res.status(error.status)
      res.json({ message: error.message })
    } else if (error instanceof Error) {
      res.status(INTERNAL_SERVER_ERROR)
      res.json({ message: 'Internal server error' })
    }
  }
}

export { validateAuthBody }
