import ServerError from '@core/instances/ServerError'
import fs from 'fs'

const verify = async (file: string): Promise<boolean> => {
  try {
    fs.readFile(file, () => {})

    return true
  } catch (error) {
    if (error instanceof ServerError) {
      throw new ServerError(error.message, error.code || 501)
    }

    return false
  }
}

export { verify }
