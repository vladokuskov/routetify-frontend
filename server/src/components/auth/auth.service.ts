import ServerError from 'core/instances/ServerError'
import db from 'db'
import { CONFLICT } from 'http-status'
import bcrypt from 'bcrypt'
import config from 'config'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const register = async (email: string, password: string) => {
  const isUserExist = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (isUserExist) {
    throw new ServerError('Email already taken, choose another', CONFLICT)
  }

  const saltRounds = config.saltRounds

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const newUser = await db.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  })

  if (newUser) {
    const secret = process.env.AUTH_SECRET || ' '
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, username: newUser.username },
      secret,
      {
        expiresIn: config.cookieExpiration,
      },
    )

    const serialized = serialize('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: config.cookieExpiration,
      path: '/',
    })

    return {
      token: serialized,
    }
  } else {
    return false
  }
}

const login = async (email: string, password: string) => {
  const existedUser = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (!existedUser) {
    throw new ServerError(
      'Invalid user information. Please check and try again',
      CONFLICT,
    )
  }

  const isPasswordValid = await bcrypt.compare(password, existedUser.password)

  if (!isPasswordValid) {
    throw new ServerError(
      'Invalid user information. Please check and try again',
      CONFLICT,
    )
  }

  const secret = process.env.AUTH_SECRET || ' '
  const token = jwt.sign(
    {
      id: existedUser.id,
      email: existedUser.email,
      username: existedUser.username,
    },
    secret,
    {
      expiresIn: config.cookieExpiration,
    },
  )

  const serialized = serialize('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: config.cookieExpiration,
    path: '/',
  })

  return {
    token: serialized,
  }
}

export { register, login }
