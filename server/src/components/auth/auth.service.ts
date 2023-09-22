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
    const token = jwt.sign({ id: newUser.id }, secret, {
      expiresIn: 60 * 60 * 24 * 30,
    })

    const serialized = serialize('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
      token: serialized,
    }
  } else {
    return false
  }
}

const login = async () => {}

export { register, login }
