import Icon from '@/components/Icon/Icon'
import fitBounds from '@/lib/fitBounds'
import { putDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Route } from '@/types/global/export.types'
import { DrawCoords } from '@/types/models/drawCoords.types'
import clsx from 'clsx'
import downloadjs from 'downloadjs'
import { useEffect, useRef, useState } from 'react'
import DownloadIcon from '../../../../assets/icons/download.svg'
import ArrowUpIcon from '../../../../assets/icons/chevron-up.svg'
import ArrowDownIcon from '../../../../assets/icons/chevron-down.svg'
import ArrowRightIcon from '../../../../assets/icons/arrow-right.svg'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Button } from '@/components/Button/Button'

const date = new Date()
const current_date = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`

const Export = () => {
  const selectionMenuRef = useRef(null)
  const [filename, setFilename] = useState<string>('')
  const [selectedRouteType, setSelectedRouteType] = useState<Route>(Route.GPX)
  const [isSelectionMenuOpen, setIsSelectionMenuOpen] = useClickOutside(
    selectionMenuRef,
    false,
  )
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

  const handleRouteDownload = async () => {
    let route
    if (selectedRouteType === Route.GPX && drawCoords.length > 0) {
      route = await generateGPX(drawCoords)
    } else if (selectedRouteType === Route.KML) {
      route = await generateKML(drawCoords)
    }

    if (route) {
      downloadjs(
        route,
        `${
          filename.length === 0 || !filename
            ? `new_route_${current_date}`
            : filename
        }${selectedRouteType === Route.GPX ? '.gpx' : '.kml'}`,
        `application/${
          selectedRouteType === Route.GPX
            ? 'application/gpx+xml'
            : 'vnd.google-earth.kml+xml'
        }`,
      )
    }
  }

  const handleSelectionMenuOpen = () => {
    setIsSelectionMenuOpen((prev) => !prev)
  }

  const handleRouteTypeChange = (type: Route | null) => {
    if (!type) {
      setSelectedRouteType(
        selectedRouteType === Route.GPX ? Route.KML : Route.GPX,
      )
    } else {
      setSelectedRouteType(type)
    }
    setIsSelectionMenuOpen(false)
  }

  return (
    <div
      className={clsx(
        'w-full relative bg-neutral-300 rounded font-roboto font-semibold flex justify-center items-center',
        'max-sm:!flex-row',
        !isSidebarOpen && 'flex-col',
      )}
      ref={selectionMenuRef}
    >
      <button
        onClick={handleRouteDownload}
        disabled={drawCoords.length === 0}
        title="Download route"
        className="w-full inline-flex justify-center items-center gap-4 p-3 text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={clsx('', 'max-sm:!block', !isSidebarOpen && 'hidden')}>
          Download
        </span>
        <Icon svg={DownloadIcon} />
      </button>
      <button
        className={clsx(
          'w-full max-w-[7rem] inline-flex justify-center items-center gap-1 p-3 text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 rounded-md transition-colors',
          'max-sm:!inline-flex',
          !isSidebarOpen && 'hidden',
        )}
        title="Select route type"
        onClick={handleSelectionMenuOpen}
      >
        <span className={clsx('', 'max-sm:!block', !isSidebarOpen && 'hidden')}>
          {selectedRouteType === Route.GPX ? 'GPX' : 'KML'}
        </span>
        <Icon svg={isSelectionMenuOpen ? ArrowUpIcon : ArrowDownIcon} />
      </button>
      <button
        className={clsx(
          'w-full flex flex-col justify-center items-center gap-1 p-3 text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 rounded-md transition-colors',
          'max-sm:!hidden',
          isSidebarOpen && 'hidden',
        )}
        title="Change route type"
        onClick={() => handleRouteTypeChange(null)}
      >
        <span>{selectedRouteType === Route.GPX ? 'GPX' : 'KML'}</span>
        <Icon svg={ArrowRightIcon} />
      </button>
      {isSelectionMenuOpen && (
        <div
          className={clsx(
            'absolute w-full max-w-[7rem] right-0 bottom-[-5.2rem] rounded-md p-1 bg-neutral-300 shadow',
            'max-sm:!block',
            !isSidebarOpen && 'hidden',
          )}
        >
          <Button
            variant="routeType"
            title="GPX"
            onClick={() => handleRouteTypeChange(Route.GPX)}
            disabled={selectedRouteType === Route.GPX}
          >
            GPX
          </Button>
          <Button
            variant="routeType"
            title="KML"
            onClick={() => handleRouteTypeChange(Route.KML)}
            disabled={selectedRouteType === Route.KML}
          >
            KML
          </Button>
        </div>
      )}
    </div>
  )
}

export { Export }
