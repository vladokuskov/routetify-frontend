import config from 'config'
import { serialize } from 'cookie'
import { getTokenFromCookie } from 'core/utils/getTokenFromCookie'
import { NextFunction, Request, Response } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status'
import jwt from 'jsonwebtoken'

interface TokenBody {
  id: number
  email: string
  username: string
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

    const token = getTokenFromCookie(cookie)

    if (!token) {
      return res
        .status(BAD_REQUEST)
        .json({ message: 'Token not found in the cookie' })
    }

    jwt.verify(token, secret, (err: any) => {
      if (err)
        return res
          .status(BAD_REQUEST)
          .json({ message: 'Failed to authenticate token' })

      const { id, email, username } = jwt.decode(token, {
        json: true,
      }) as TokenBody

      const updatedToken = jwt.sign({ id, email, username }, secret, {
        expiresIn: config.cookieExpiration,
      })

      res.setHeader(
        'Set-Cookie',
        serialize('token', updatedToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: config.cookieExpiration,
          path: '/',
        }),
      )

      req.body = { id, email, username }

      return next()
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
  }
}

export { verifyAuthorization }
