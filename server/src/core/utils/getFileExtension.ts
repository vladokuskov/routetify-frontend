import ServerError from '@core/instances/ServerError'
import { allowedExtensions } from 'config'
import httpStatus from 'http-status'
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
  if (!allowedExtensions.includes(extension as Extension)) {
    throw new ServerError(
      'Provide a file with a correct extension.',
      httpStatus.NOT_ACCEPTABLE,
    )
  }

  return extension as Extension
}

export { getFileExtension }
