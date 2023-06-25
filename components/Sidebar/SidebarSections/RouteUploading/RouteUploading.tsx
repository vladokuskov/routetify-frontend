import Icon from '@/components/Icon/Icon'
import fitBounds from '@/lib/fitBounds'
import { parseFile } from '@/lib/routeFileParses'
import {
  checkFileExtension,
  getFileExtension,
  validateFileStructure,
} from '@/lib/validations/routeFileValidation'
import { putDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import FileImportIcon from '../../../../assets/icons/file-import.svg'

const RouteUploading = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isUserConfirmed, setIsUserConfirmed] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const map = useAppSelector((state) => state.controlsReducer.map)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    setFile(e.target.files[0])
  }

  useEffect(() => {
    const handleRouteDisplaying = async () => {
      if (!file) return

      const fileName = file.name

      try {
        // Checking file extension if it GPX or KML
        const isCorrectFileExtension = await checkFileExtension(fileName)

        if (isCorrectFileExtension) {
          const isFileStructureValid = await validateFileStructure(file)

          if (isFileStructureValid) {
            const extension = await getFileExtension(fileName)

            const route = await parseFile(file, extension ? extension : null)

            dispatch(putDrawCoords(route))

            fitBounds(map, route)
          }
        }
      } catch (err) {
        if (err instanceof Error) toast.error(err.message)
      }

      setFile(null)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    handleRouteDisplaying()
  }, [file])

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center gap-4"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="w-full flex items-center justify-center p-2 rounded-md border border-dashed border-neutral-400 font-roboto font-semibold text-neutral-600">
          Drop file
        </div>
      )}
      <button
        className="inline-flex justify-center items-center gap-2 w-full p-2 bg-neutral-300 rounded-md font-sans font-semibold text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 transition-colors"
        onClick={() => {
          if (!isUserConfirmed) {
            const isConfirmed = window.confirm(
              'If you have route, it will be replaced, continue?',
            )

            if (!isConfirmed) return

            setIsUserConfirmed(true)
            inputRef.current?.click()
          } else {
            inputRef.current?.click()
          }
        }}
        title="Choose a file"
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
