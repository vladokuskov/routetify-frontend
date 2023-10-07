import FileImportIcon from '@/assets/icons/file-import.svg'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import fitBounds from '@/lib/fitBounds'
import { putDrawCoords } from '@/redux/features/drawSlice'
import { updateRouteFile } from '@/redux/features/fileUploadSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawCoords } from '@/types/models/drawCoords.types'
import clsx from 'clsx'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { getRoute } from '@/lib/api/route'
import { FilesDragAndDrop } from '@/components/FilesDragAndDrop/FilesDragAndDrop'

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
      toast.loading('File parsing', { duration: 0, id: 'loading' })

      const route: DrawCoords[] = await getRoute(routeFile)

      dispatch(putDrawCoords(route))

      fitBounds(map, route)

      toast.dismiss('loading')
    } catch (err) {
      if (err instanceof Error) toast.error(err.message)
      toast.dismiss('loading')
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
      <Button
        variant="secondary"
        className="w-full"
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
        disabled={!map}
      >
        <span>
          <Icon svg={FileImportIcon} />
        </span>
        <span className={clsx('max-sm:!block', !isSidebarOpen && 'hidden')}>
          Choose a file
        </span>
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".gpx,.kml"
        onChange={handleFileSelection}
        className="hidden"
      />

      <FilesDragAndDrop />
    </div>
  )
}

export { RouteUploading }
