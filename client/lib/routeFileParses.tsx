import { DrawCoords } from '@/types/models/drawCoords.types'
import { parseString } from 'xml2js'

export async function parseFile(
  file: File,
  extension: string | null,
): Promise<DrawCoords[]> {
  return new Promise<DrawCoords[]>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = (e.target as FileReader).result

      if (typeof content === 'string') {
        parseString(content, (err, result) => {
          if (err) {
            reject(new Error('Failed to read file, choose another.'))
          } else if (extension === 'gpx') {
            const points = result.gpx.trk[0].trkseg[0].trkpt

            if (points.length === 0) {
              reject(new Error('Empty coordinates in the GPX file.'))
            }

            const route = points.map((point: any) => {
              const parsedLat = Number(point.$.lat)
              const parsedLng = Number(point.$.lon)

              if (isNaN(parsedLat) || isNaN(parsedLng)) {
                return null // Skip invalid coordinates
              }

              return {
                lat: parsedLat,
                lng: parsedLng,
              }
            })
            resolve(route.filter((coord: DrawCoords) => coord !== null))
          } else if (extension === 'kml') {
            const coordinates = result.kml.Document[0].Placemark.find(
              (placemark: any) => placemark.LineString,
            ).LineString[0].coordinates[0]

            if (coordinates.length === 0) {
              reject(new Error('Empty coordinates in the KML file.'))
            }

            const route = coordinates.split('\n').map((coord: string) => {
              const [lng, lat, _] = coord.trim().split(',')
              const parsedLat = Number(lat)
              const parsedLng = Number(lng)

              if (isNaN(parsedLat) || isNaN(parsedLng)) {
                return null // Skip invalid coordinates
              }

              return {
                lat: parsedLat,
                lng: parsedLng,
              }
            })

            resolve(route.filter((coord: DrawCoords) => coord !== null)) // Remove any null coordinates
          } else if (!extension) {
            reject(new Error('Invalid file type.'))
          }
        })
      }
    }

    reader.onerror = (e: ProgressEvent<FileReader>) => {
      reject(new Error('Failed to read file, choose another.'))
    }

    reader.readAsText(file)
  })
}
