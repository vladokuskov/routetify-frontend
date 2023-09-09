import Icon from '@/components/Icon/Icon'
import { useClickOutside } from '@/hooks/useClickOutside'
import fitBounds from '@/lib/fitBounds'
import {
  currentDate,
  generateGPX,
  generateKML,
} from '@/lib/generateRouteString'
import { useAppSelector } from '@/redux/hooks'
import { Route } from '@/types/global/export.types'
import clsx from 'clsx'
import downloadjs from 'downloadjs'
import { useRef, useState } from 'react'
import ArrowDownIcon from '@/assets/icons/chevron-down.svg'
import ArrowUpIcon from '@/assets/icons/chevron-up.svg'
import DownloadIcon from '@/assets/icons/download.svg'
import { RouteExportButton } from '@/components/Sidebar/SidebarSections/RouteExport/RouteExportButton'

const RouteExport = () => {
  const selectionMenuRef = useRef(null)
  const [filename, setFilename] = useState<string>('')
  const [selectedRouteType, setSelectedRouteType] = useState<Route>(Route.GPX)
  const [isSelectionMenuOpen, setIsSelectionMenuOpen] = useClickOutside(
    selectionMenuRef,
    false,
  )
  const [isArrowAnimated, setIsArrowAnimated] = useState(false)

  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const { GPX, KML } = Route

  const types = [GPX, KML]

  const handleRouteDownload = async () => {
    let route
    if (selectedRouteType === GPX && drawCoords.length > 0) {
      route = await generateGPX(filename, drawCoords)
    } else if (selectedRouteType === KML) {
      route = await generateKML(filename, drawCoords)
    }

    if (route) {
      downloadjs(
        route,
        `${
          filename.length === 0 || !filename
            ? `new_route_${currentDate}`
            : filename
        }${selectedRouteType === GPX ? '.gpx' : '.kml'}`,
        `application/${
          selectedRouteType === GPX
            ? 'application/gpx+xml'
            : 'vnd.google-earth.kml+xml'
        }`,
      )
    }
  }

  const handleSelectionMenuOpen = () => {
    setIsSelectionMenuOpen((prev) => !prev)
  }

  const handleRouteTypeChange = (type?: Route) => {
    if (!type) {
      setSelectedRouteType(selectedRouteType === GPX ? KML : GPX)
      setIsArrowAnimated(true)
      setTimeout(() => {
        setIsArrowAnimated(false)
      }, 200)
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
        aria-label={`Export route in ${selectedRouteType} format`}
        title={`Export route in ${
          selectedRouteType === GPX ? 'GPX' : 'KML'
        } format`}
        className="w-full inline-flex justify-center items-center gap-4 p-3 text-neutral-800 hocus:bg-neutral-200 hocus:text-neutral-950 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={clsx('', 'max-sm:!block', !isSidebarOpen && 'hidden')}>
          Download
        </span>
        <Icon svg={DownloadIcon} />
      </button>
      <button
        className={clsx(
          'w-full max-w-[7rem] inline-flex justify-center items-center gap-1 p-3 text-neutral-800 hocus:bg-neutral-200 hocus:text-neutral-950 rounded-md transition-colors',
          'max-sm:!inline-flex',
          !isSidebarOpen && 'hidden',
        )}
        aria-label="Open dropdown to choose route type"
        onClick={handleSelectionMenuOpen}
      >
        <span className={clsx('', 'max-sm:!block', !isSidebarOpen && 'hidden')}>
          {selectedRouteType === GPX ? 'GPX' : 'KML'}
        </span>
        <Icon svg={isSelectionMenuOpen ? ArrowUpIcon : ArrowDownIcon} />
      </button>

      {/*Compact sidebar */}
      {!isSidebarOpen && (
        <RouteExportButton
          variant="compact"
          onClick={() => handleRouteTypeChange()}
          selectedType={selectedRouteType}
          isArrow={isArrowAnimated}
        />
      )}

      {/*Dropdown*/}
      {isSelectionMenuOpen && isSidebarOpen && (
        <div
          className={clsx(
            'absolute w-full max-w-[7rem] right-0 bottom-[-4.7rem] rounded-md p-1 bg-neutral-300 shadow',
            'max-sm:!block',
          )}
        >
          {types.map((routeType, index) => {
            return (
              <RouteExportButton
                variant="type"
                key={index}
                onClick={() => handleRouteTypeChange(routeType)}
                selectedType={selectedRouteType}
                routeType={routeType}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export { RouteExport }
