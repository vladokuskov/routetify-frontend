import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'
import ServerError from 'core/instances/ServerError'

const getUser = async (req: Request, res: Response) => {
  try {
    const body = req.body

    const user = { id: body.id, email: body.email, username: body.username }

    res.status(OK).json({ user: user })
  } catch (error) {
    if (error instanceof ServerError) {
      res.status(error.status).json({ message: error.message })
    }
    if (error instanceof Error) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
    }
  }
}

export { getUser }
