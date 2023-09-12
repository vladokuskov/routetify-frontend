import { DrawCoords } from '@/types/models/drawCoords.types'

const date = new Date()

const currentDate = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`

const generateGPX = async (filename: string, coords: DrawCoords[]) => {
  const coordinates = await Promise.all(
    coords.map(
      async (point) => `<trkpt lat="${point.lat}" lon="${point.lng}"></trkpt>`,
    ),
  )

  let routeString = `
    <?xml version="1.0" encoding="UTF-8"?>
    <gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.topografix.com/GPX/gpx_style/0/2 http://www.topografix.com/GPX/gpx_style/0/2/gpx_style.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpx_style="http://www.topografix.com/GPX/gpx_style/0/2" version="1.1" creator="https://cycplanner.vercel.app/">
      <metadata>
        <name>${
          filename.length === 0 || !filename
            ? `new_route_${currentDate}`
            : filename
        }</name>
        <author>
          <name>cycroute</name>
          <link href="https://cycplanner.vercel.app/"></link>
        </author>
      </metadata>
      <trk>
        <name>${
          filename.length === 0 || !filename
            ? `new_route_${currentDate}`
            : filename
        }</name>
        <type>Cycling</type>
        <trkseg>
          ${coordinates.join('\n\t')}
        </trkseg>
      </trk>
    </gpx>`

  return routeString
}

const generateKML = async (filename: string, coords: DrawCoords[]) => {
  const coordinates = await Promise.all(
    coords.map(async (point) => `${point.lng},${point.lat},0`),
  )

  let routeString = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
      <Document>
        <name>${
          filename.length === 0 || !filename
            ? `new_route_${currentDate}`
            : filename
        }</name>
        <Placemark>
          <name>Start</name>
          <description>Start Waypoint</description>
          <Point>
            <coordinates>${coordinates[0]}</coordinates>
          </Point>
        </Placemark>
        <Placemark>
          <name>End</name>
          <description>End Waypoint</description>
          <Point>
            <coordinates>${coordinates[coordinates.length - 1]}</coordinates>
          </Point>
        </Placemark>
        <Placemark>
          <name>${
            filename.length === 0 || !filename
              ? `new_route_${currentDate}`
              : filename
          }</name>
          <LineString>
            <tessellate>1</tessellate>
            <coordinates>
            ${coordinates.join('\n')}
            </coordinates>
          </LineString>
        </Placemark>
      </Document>
    </kml>`

  return routeString
}

export { generateGPX, generateKML, currentDate }
