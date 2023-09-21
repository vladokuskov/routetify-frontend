import ServerError from 'core/instances/ServerError'
import db from 'db'
import { CONFLICT } from 'http-status'
import bcrypt from 'bcrypt'
import config from 'config'

const register = async (email: string, password: string) => {
  const isEmailExist = !!(await db.user.findFirst({
    where: {
      email,
    },
  }))

  if (isEmailExist) {
    throw new ServerError('Email already taken, choose another.', CONFLICT)
  }

  const hashedPassword = await bcrypt.hash(password, config.saltRounds)

  return true
}

const login = async () => {}

const logout = async () => {}

export { login, logout, register }
