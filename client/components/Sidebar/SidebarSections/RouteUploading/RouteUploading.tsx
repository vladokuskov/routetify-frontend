import FileImportIcon from '@/assets/icons/file-import.svg'
import Icon from '@/components/Icon/Icon'
import fitBounds from '@/lib/fitBounds'
import { putDrawCoords } from '@/redux/features/drawSlice'
import { updateRouteFile } from '@/redux/features/fileUploadSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawCoords } from '@/types/models/drawCoords.types'
import { parseFile } from '@/utils/fileOperations'
import clsx from 'clsx'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

const RouteUploading = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUserConfirmed, setIsUserConfirmed] = useState<boolean>(false)

  const map = useAppSelector((state) => state.controlsReducer.map)
  const routeFile = useAppSelector((state) => state.fileUploadReducer.routeFile)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    dispatch(updateRouteFile(e.target.files[0]))
  }

  const handleRouteDisplaying = async () => {
    if (!routeFile) return

    if (!map) {
      toast.error('Map is not initialized.')
      return
    }

    try {
      toast.loading('Loading route...', { duration: 0 })

      const route = await parseFile(routeFile)

      dispatch(putDrawCoords(route))

      fitBounds(map, route)

      toast.dismiss()
    } catch (err) {
      if (err instanceof Error) toast.error(err.message)

      toast.dismiss()
    }

    dispatch(updateRouteFile(null))

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const getRouteFromLocalStorage = () => {
    const route = localStorage.getItem('route')

    if (route) {
      const parsedRoute = JSON.parse(route) as DrawCoords[]

      if (parsedRoute.length > 0) {
        dispatch(putDrawCoords(parsedRoute))
        fitBounds(map, parsedRoute)
      }
    }
  }

  useEffect(() => {
    handleRouteDisplaying()
  }, [routeFile])

  useEffect(() => {
    getRouteFromLocalStorage()
  }, [map])

  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-4">
      <button
        className="inline-flex justify-center items-center gap-2 w-full p-2 bg-neutral-300 rounded-md font-sans font-semibold text-neutral-800 hocus:bg-neutral-200 hocus:text-neutral-950 transition-colors"
        onClick={() => {
          if (!isUserConfirmed) {
            const isConfirmed = window.confirm(
              'If you have active route, it will be replaced, continue?',
            )

            if (!isConfirmed) return

            setIsUserConfirmed(true)
            inputRef.current?.click()
          } else {
            inputRef.current?.click()
          }
        }}
        aria-label="Choose a file to upload"
        title="Choose a file to upload"
      >
        <span>
          <Icon svg={FileImportIcon} />
        </span>
        <span className={clsx('max-sm:!block', !isSidebarOpen && 'hidden')}>
          Choose a file
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".gpx,.kml"
        onChange={handleFileSelection}
        className="hidden"
      />
    </div>
  )
}

export { RouteUploading }
