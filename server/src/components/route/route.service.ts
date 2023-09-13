import ServerError from 'core/instances/ServerError'
import httpStatus from 'http-status'
import { Extension } from 'types/extensions.types'

const parse = async (file: Express.Multer.File, extension: Extension) => {
  // Map iterate through each features[] and extract coordinates from each feature
  // Return coords array to user, if there`s no coords, return error

  return []
}

export { parse }
