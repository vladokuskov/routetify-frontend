import ServerError from 'core/instances/ServerError'
import httpStatus from 'http-status'
import { Extension } from 'types/extensions.types'
import toGeoJSON from '@mapbox/togeojson'
import { DOMParser } from 'xmldom'

const verifyFileStructure = async (
  file: Express.Multer.File,
  extension: Extension,
) => {
  const fileContent = file.buffer.toString()

  if (fileContent.length === 0) {
    throw new ServerError(
      'Provide a file with content inside.',
      httpStatus.NOT_ACCEPTABLE,
    )
  }

  const doc = new DOMParser().parseFromString(fileContent, 'text/xml')

  let converted
  if (extension === 'gpx') {
    converted = toGeoJSON.gpx(doc)
  } else if (extension === 'kml') {
    converted = toGeoJSON.kml(doc)
  }

  if (!hasCoordinates(converted)) {
    throw new ServerError(
      `Provide a ${extension.toUpperCase()} file with coordinates inside or check structure.`,
      httpStatus.NOT_ACCEPTABLE,
    )
  }
}

const hasCoordinates = (converted: any) => {
  return converted && converted.features && converted.features.length > 0
}

export { verifyFileStructure }
