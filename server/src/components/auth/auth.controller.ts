import { Request, Response } from 'express'
import httpStatus from 'http-status'

const loginUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      res.json({ message: 'Internal server error' })
    }
  }
}

const logoutUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      res.json({ message: 'Internal server error' })
    }
  }
}

export { loginUser, logoutUser }
