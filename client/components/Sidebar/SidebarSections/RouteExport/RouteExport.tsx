import Icon from '@/components/Icon/Icon'
import { useClickOutside } from '@/hooks/useClickOutside'
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
import { Button } from '@/components/ui/button'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'

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
        'w-full relative flex justify-center items-center gap-2',
        'max-sm:!flex-row',
        !isSidebarOpen && 'flex-col',
      )}
      ref={selectionMenuRef}
    >
      <Button
        variant="secondary"
        onClick={handleRouteDownload}
        disabled={drawCoords.length === 0}
        aria-label={`Export route in ${selectedRouteType} format`}
        title={`Export route in ${
          selectedRouteType === GPX ? 'GPX' : 'KML'
        } format`}
        className="w-full"
      >
        <Icon svg={DownloadIcon} />
        <span className={clsx('', 'max-sm:!block', !isSidebarOpen && 'hidden')}>
          Download
        </span>
      </Button>

      <Button
        variant="secondary"
        className={clsx('max-sm:!inline-flex w-20', !isSidebarOpen && 'hidden')}
        aria-label="Open dropdown to choose route type"
        onClick={handleSelectionMenuOpen}
      >
        <span className={clsx('', 'max-sm:!block', !isSidebarOpen && 'hidden')}>
          {selectedRouteType === GPX ? 'GPX' : 'KML'}
        </span>
        <Icon svg={isSelectionMenuOpen ? ArrowUpIcon : ArrowDownIcon} />
      </Button>

      {/*Compact sidebar */}
      {!isSidebarOpen && (
        <Button
          className="w-full h-16 flex-col justify-start relative max-sm:hidden"
          variant="secondary"
          onClick={() => handleRouteTypeChange()}
          aria-label={
            selectedRouteType === GPX
              ? 'GPX export format'
              : 'KML export format'
          }
          title={
            selectedRouteType === GPX
              ? 'GPX export format'
              : 'KML export format'
          }
        >
          <span>{selectedRouteType === GPX ? 'GPX' : 'KML'}</span>
          <Icon
            svg={ArrowRightIcon}
            className={clsx(
              'absolute bottom-5 h-1',
              'transform transition-transform',
              isArrowAnimated && 'animate-move-right',
            )}
          />
        </Button>
      )}

      {/*Dropdown*/}
      {isSelectionMenuOpen && (
        <div
          className={clsx(
            'absolute w-full flex flex-col items-center justify-start gap-1 max-w-[7rem] right-0 top-11 rounded-md p-1 bg-popover shadow',
            'max-sm:!block',
            !isSidebarOpen && 'hidden',
          )}
        >
          {types.map((routeType, index) => {
            return (
              <Button
                variant="ghost"
                className="w-full text-popover-foreground dark:hover:bg-neutral-400"
                disabled={routeType === selectedRouteType}
                key={index}
                onClick={() => handleRouteTypeChange(routeType)}
              >
                {routeType === GPX ? 'GPX' : 'KML'}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { RouteExport }
