import Icon from '@/components/Icon/Icon'
import fitBounds from '@/lib/fitBounds'
import { parseFile } from '@/lib/routeFileParses'
import {
  getFileExtension,
  isGPXFileType,
  isKMLFileType,
  validateFileStructure,
} from '@/lib/validations/routeFileValidation'
import { putDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import { ChangeEvent, useRef } from 'react'
import FileImportIcon from '../../../../assets/icons/file-import.svg'

//TODO fix KML file uploading

const RouteUploading = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const map = useAppSelector((state) => state.controlsReducer.map)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selectedFile = e.target.files[0]
    const fileName = selectedFile.name

    const isGPX = await isGPXFileType(fileName)
    const isKML = await isKMLFileType(fileName)

    if (isGPX || isKML) {
      const isFileStructureValid = await validateFileStructure(selectedFile)

      if (isFileStructureValid) {
        const extension = await getFileExtension(fileName)

        if (extension) {
          const route = await parseFile(selectedFile, extension)

          dispatch(putDrawCoords(route))

          fitBounds(map, route)
        } else {
          console.error('Choose another file, this file is incompatible.')
        }
      } else {
        console.error('Choose another file, this file is incompatible.')
      }
    } else {
      console.error('Select the correct file type!')
    }

    // Reset selected file
    e.target.value = ''
  }

  return (
    <>
      <button
        className="inline-flex justify-center items-center gap-2 w-full p-2 bg-neutral-300 rounded-md font-sans font-semibold text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 transition-colors"
        onClick={() => {
          const isConfirmed = window.confirm(
            'If you have route, it will be replaced, continue?',
          )

          if (!isConfirmed) return

          inputRef.current?.click()
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
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  )
}

export { RouteUploading }
