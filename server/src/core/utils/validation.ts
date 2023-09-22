import ServerError from 'core/instances/ServerError'
import { CONFLICT } from 'http-status'

const validateEmail = async (email: string) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const isValid = regex.test(email)

  if (isValid) {
    return true
  }

  throw new ServerError('Provide correct email.', CONFLICT)
}

const validatePassword = async (password: string) => {
  // 8 characters, One upper case, one number
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  const isValid = regex.test(password)

  if (isValid) {
    return true
  }

  throw new ServerError('Provide correct password.', CONFLICT)
}

export { validateEmail, validatePassword }
