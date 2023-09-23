import { NextFunction, Request, Response } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status'
import jwt from 'jsonwebtoken'

interface TokenBody {
  id: number
  email: string
}

const verifyAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookie = req.headers.cookie

  if (!cookie) {
    return res.status(UNAUTHORIZED).json({
      message: 'Unauthorized',
    })
  }

  try {
    const secret = process.env.AUTH_SECRET || ' '

    const token = cookie.split('=')[1]

    jwt.verify(token, secret, (err) => {
      if (err)
        return res
          .status(BAD_REQUEST)
          .json({ error: 'Failed to authenticate token' })

      const { id, email } = jwt.decode(token, { json: true }) as TokenBody

      ;(req as any).user = { id, email }

      next()
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
  }
}

export { verifyAuthorization }
