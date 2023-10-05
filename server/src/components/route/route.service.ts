import { Extension } from '@/types/extensions.types'
const toGeoJSON = require('@mapbox/togeojson')
import { DOMParser } from 'xmldom'

const parse = async (file: Express.Multer.File, extension: Extension) => {
  const parsedCoordinates: { lat: string; lng: string }[] = []

  const fileContent = file.buffer.toString()

  const doc = new DOMParser().parseFromString(fileContent, 'text/xml')

  let converted

  if (extension === 'gpx') {
    converted = toGeoJSON.gpx(doc)
  } else if (extension === 'kml') {
    converted = toGeoJSON.kml(doc)
  }

  const coordinatesArray: string[] = []

  converted.features.forEach((feature: any) => {
    const coordinates = feature.geometry.coordinates

    return coordinatesArray.push(coordinates)
  })

  coordinatesArray.forEach((coordinates: any) => {
    if (coordinates.length < 4 || coordinates.length > 3) {
      const validCoordinates = []

      for (const subCoordinate of coordinates) {
        if (!isNaN(subCoordinate[0]) && !isNaN(subCoordinate[1])) {
          validCoordinates.push({
            lat: subCoordinate[1],
            lng: subCoordinate[0],
          })
        }
      }

      parsedCoordinates.push(...validCoordinates)
    }
  })

  return parsedCoordinates
}

export { parse }
