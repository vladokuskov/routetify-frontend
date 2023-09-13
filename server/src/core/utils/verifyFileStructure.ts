import ServerError from '@core/instances/ServerError'
import httpStatus from 'http-status'
import { Extension } from 'types/extensions.types'

const verifyFileStructure = async (
  file: Express.Multer.File,
  extension: Extension,
) => {
  const fileContent = file.buffer.toString()
  if (fileContent.length === 0) {
    throw new ServerError(
      'Provide a file with content  inside.',
      httpStatus.NOT_ACCEPTABLE,
    )
  }

  if (extension === 'gpx') {
  }

  if (extension === 'kml') {
  }
}

export { verifyFileStructure }
