import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Route } from '@/types/global/export.types'
import { DrawCoords } from '@/types/models/drawCoords.types'
import downloadjs from 'downloadjs'
import { useEffect, useState } from 'react'
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles'
import { putDrawCoords } from '@/redux/features/drawSlice'
import fitBounds from '@/lib/fitBounds'
import {
  StyledExportButtonWrapper,
  StyledExportSelectionButton,
  StyledSelectionMenuButton,
  StyledSelectionMenuWrapper,
  StyledExportButton,
} from './Export.styles'
import Icon from '@/components/Icon/Icon'
import DownloadIcon from '../../../../assets/icons/download.svg'
import ArrowUpIcon from '../../../../assets/icons/chevron-up.svg'
import ArrowDownIcon from '../../../../assets/icons/chevron-down.svg'

const date = new Date()
const current_date = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`

const Export = () => {
  const [filename, setFilename] = useState<string>('')
  const [selectedType, setSelectedType] = useState<Route>(Route.GPX)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const map = useAppSelector((state) => state.controlsReducer.map) // L.Map || null

  const dispatch = useAppDispatch()

  useEffect(() => {
    const route = localStorage.getItem('route')

    if (route) {
      const parsedRoute = JSON.parse(route) as DrawCoords[]

      if (parsedRoute.length > 0) {
        dispatch(putDrawCoords(parsedRoute))
        fitBounds(map, parsedRoute)
      }
    }
  }, [map])

  const generateGPX = async (coords: DrawCoords[]) => {
    let gpxString = `
    <?xml version="1.0" encoding="UTF-8"?>
    <gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.topografix.com/GPX/gpx_style/0/2 http://www.topografix.com/GPX/gpx_style/0/2/gpx_style.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpx_style="http://www.topografix.com/GPX/gpx_style/0/2" version="1.1" creator="https://cycplanner.vercel.app/">
      <metadata>
        <name>${
          filename.length === 0 || !filename
            ? `new_route_${current_date}`
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
            ? `new_route_${current_date}`
            : filename
        }</name>
        <type>Cycling</type>
        <trkseg>
          ${await Promise.resolve(
            coords
              .map(
                (point) =>
                  `<trkpt lat="${point.lat}" lon="${point.lng}"></trkpt>`,
              )
              .join('\n\t'),
          )}
        </trkseg>
      </trk>
    </gpx>`

    return gpxString
  }

  const generateKML = async (coords: DrawCoords[]) => {
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
            ${await Promise.resolve(
              coords.forEach(
                (point, index: number) => `${point.lng},${point.lat},0`,
              ),
            )}
          </coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`

    return kmlString
  }

  const handleRouteDownload = async (e: Route) => {
    const route =
      e === Route.GPX
        ? await generateGPX(drawCoords)
        : await generateKML(drawCoords)

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
      <StyledExportButtonWrapper isSidebarOpen={isSidebarOpen}>
        <StyledExportButton
          title="Download route"
          onClick={() => handleRouteDownload(selectedType)}
        >
          {/* TODO: Handle name change from DOWNLOAD to ROUTE TYPE when isSidebarOpen and min-width:650px */}
          {isSidebarOpen}
          <Icon svg={DownloadIcon} />
        </StyledExportButton>

        <StyledExportSelectionButton></StyledExportSelectionButton>
        {isMenuOpen && (
          <StyledSelectionMenuWrapper>
            <StyledSelectionMenuButton></StyledSelectionMenuButton>
          </StyledSelectionMenuWrapper>
        )}
      </StyledExportButtonWrapper>
    </StyledSidebarSectionContent>
  )
}

export { Export }
