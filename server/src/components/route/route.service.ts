import ServerError from '@core/instances/ServerError'
import { allowedExtensions } from 'config'
import httpStatus from 'http-status'

const parse = async (file: Express.Multer.File, extension: string) => {
  return []
}

export { parse }
