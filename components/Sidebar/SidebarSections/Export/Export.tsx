import { useAppSelector } from '@/redux/hooks'
import { useState } from 'react'
import downloadjs from 'downloadjs'
import { DrawCoords } from '@/types/models/drawCoords.types'
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles'
import { Button } from '@/components/Button/Button'
import { Route } from '@/types/global/index.types'

const date = new Date()
const current_date = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`

const Export = () => {
  const exportCoords = useAppSelector((state) => state.drawReducer.exportCoords)

  const [filename, setFilename] = useState<string>('')

  const generateGPX = (coords: DrawCoords[]) => {
    let gpxString = `
    <?xml version="1.0" encoding="UTF-8"?>
    <gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.topografix.com/GPX/gpx_style/0/2 http://www.topografix.com/GPX/gpx_style/0/2/gpx_style.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpx_style="http://www.topografix.com/GPX/gpx_style/0/2" version="1.1" creator="https://cycplanner.vercel.app/">
      <metadata>
        <name>${filename}</name>
        <author>
          <name>cycroute</name>
          <link href="https://cycplanner.vercel.app/"></link>
        </author>
      </metadata>
      <trk>
        <name>${filename}</name>
        <type>Cycling</type>
        <trkseg>
          ${coords
            .map(
              (point) =>
                `<trkpt lat="${point.lat}" lon="${point.lng}"></trkpt>`,
            )
            .join('\n\t')}
        </trkseg>
      </trk>
    </gpx>`

    return gpxString
  }

  const generateKML = (coords: DrawCoords[]) => {
    let kmlString = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
      <Document>
        <name>${
          filename.length === 0 || !filename
            ? `new_route_${current_date}`
            : filename
        }</name>
        <Placemark>
          <name>Start</name>
          <description>Start Waypoint</description>
          <Point>
            <coordinates>${coords[0].lng},${coords[0].lat},0</coordinates>
          </Point>
        </Placemark>
        <Placemark>
          <name>End</name>
          <description>End Waypoint</description>
          <Point>
            <coordinates>${coords[coords.length - 1].lng},${
      coords[coords.length - 1].lat
    },0</coordinates>
          </Point>
        </Placemark>
        <Placemark>
          <name>${
            filename.length === 0 || !filename
              ? `new_route_${current_date}`
              : filename
          }</name>
          <LineString>
            <tessellate>1</tessellate>
            <coordinates>
            ${coords.forEach(
              (coord, index: number) => `${coord.lng},${coord.lat},0`,
            )}
          </coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`

    return kmlString
  }

  const handleRouteDownload = (e: Route) => {
    const route =
      e === Route.GPX ? generateGPX(exportCoords) : generateKML(exportCoords)

    downloadjs(
      route,
      `${
        filename.length === 0 || !filename
          ? `new_route_${current_date}`
          : filename
      }${e === Route.GPX ? '.gpx' : '.kml'}`,
      `application/${
        e === Route.GPX ? 'application/gpx+xml' : 'vnd.google-earth.kml+xml'
      }`,
    )
  }

  return (
    <StyledSidebarSectionContent>
      <Button
        variant="iconWithText"
        text="GPX"
        onClick={() => handleRouteDownload(Route.GPX)}
        full="true"
        isDisabled={exportCoords.length === 0 ? 'true' : 'false'}
      />
      <Button
        variant="iconWithText"
        text="KML"
        onClick={() => handleRouteDownload(Route.KML)}
        full="true"
        isDisabled={exportCoords.length === 0 ? 'true' : 'false'}
      />
    </StyledSidebarSectionContent>
  )
}

export { Export }
