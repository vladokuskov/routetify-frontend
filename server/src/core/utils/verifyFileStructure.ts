import { Extension } from 'types/extensions.types'
const toGeoJSON = require('@mapbox/togeojson')
import { DOMParser } from 'xmldom'

const verifyFileStructure = async (
  file: Express.Multer.File,
  extension: Extension,
) => {
  try {
    const fileContent = file.buffer.toString()

    if (fileContent.length === 0) {
      throw new Error('Provide a file with content inside.')
    }

    const doc = new DOMParser().parseFromString(fileContent, 'text/xml')

    let converted
    if (extension === 'gpx') {
      converted = toGeoJSON.gpx(doc)
    } else if (extension === 'kml') {
      converted = toGeoJSON.kml(doc)
    }

    if (!hasCoordinates(converted)) {
      throw new Error(
        `Provide a ${extension.toUpperCase()} file with coordinates inside or check structure.`,
      )
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const hasCoordinates = (converted: any) => {
  return converted && converted.features && converted.features.length > 0
}

export { verifyFileStructure }
