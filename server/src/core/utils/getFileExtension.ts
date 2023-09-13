import ServerError from 'core/instances/ServerError'
import httpStatus from 'http-status'
import config from 'config/index'
import { Extension } from 'types/extensions.types'

const getFileExtension = async (filename: string) => {
  const parts = filename.split('.')
  if (parts.length !== 2) {
    throw new ServerError(
      'Provide a file with a single extension.',
      httpStatus.NOT_ACCEPTABLE,
    )
  }

  const extension = parts[1].toLowerCase()
  if (!config.allowedExtensions.includes(extension as Extension)) {
    throw new ServerError(
      'Provide a file with a correct extension.',
      httpStatus.NOT_ACCEPTABLE,
    )
  }

  return extension as Extension
}

export { getFileExtension }