import Icon from '@/components/Icon/Icon'
import { useClickOutside } from '@/hooks/useClickOutside'
import fitBounds from '@/lib/fitBounds'
import {
  currentDate,
  generateGPX,
  generateKML,
} from '@/lib/generateRouteString'
import { putDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Route } from '@/types/global/export.types'
import { DrawCoords } from '@/types/models/drawCoords.types'
import clsx from 'clsx'
import downloadjs from 'downloadjs'
import { useEffect, useRef, useState } from 'react'
import ArrowRightIcon from '../../../../assets/icons/arrow-right.svg'
import ArrowDownIcon from '../../../../assets/icons/chevron-down.svg'
import ArrowUpIcon from '../../../../assets/icons/chevron-up.svg'
import DownloadIcon from '../../../../assets/icons/download.svg'
import { TypeSelectionButton } from './TypeSelectionButton'

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
  const map = useAppSelector((state) => state.controlsReducer.map) // L.Map || null

  const dispatch = useAppDispatch()

  const { GPX, KML } = Route

  const types = [GPX, KML]

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

  const handleRouteTypeChange = (type: Route | null) => {
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
          {selectedRouteType === GPX ? 'GPX' : 'KML'}
        </span>
        <Icon svg={isSelectionMenuOpen ? ArrowUpIcon : ArrowDownIcon} />
      </button>
      <button
        className={clsx(
          'w-full flex flex-col justify-center items-center gap-1 p-3 text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 rounded-md transition-colors',
          'max-sm:!hidden',
          isSidebarOpen && 'hidden',
          'relative pb-8',
        )}
        title="Change route type"
        onClick={() => handleRouteTypeChange(null)}
      >
        <span>{selectedRouteType === GPX ? 'GPX' : 'KML'}</span>
        <Icon
          svg={ArrowRightIcon}
          className={clsx(
            'absolute bottom-5 h-1',
            'transform transition-transform',
            isArrowAnimated && 'animate-moveRight',
          )}
        />
      </button>
      {isSelectionMenuOpen && (
        <div
          className={clsx(
            'absolute w-full max-w-[7rem] right-0 bottom-[-5.2rem] rounded-md p-1 bg-neutral-300 shadow',
            'max-sm:!block',
            !isSidebarOpen && 'hidden',
          )}
        >
          {types.map((type, index) => {
            return (
              <TypeSelectionButton
                key={index}
                handleRouteTypeChange={handleRouteTypeChange}
                selectedType={selectedRouteType}
                type={type}
                title={type === GPX ? 'GPX' : 'KML'}
              >
                {type === GPX ? 'GPX' : 'KML'}
              </TypeSelectionButton>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { RouteExport }
