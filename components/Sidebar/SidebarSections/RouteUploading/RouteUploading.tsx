import Icon from '@/components/Icon/Icon'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { ChangeEvent, useRef, useState } from 'react'
import FileImportIcon from '../../../../assets/icons/file-import.svg'
import clsx from 'clsx'

const RouteUploading = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const dispatch = useAppDispatch()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (drawCoords.length > 0) {
        const isConfirmed = window.confirm(
          'Your current route will be replaced, are you sure?',
        )

        if (isConfirmed) {
          setFile(e.target.files[0])
        }
      }

      setFile(e.target.files[0])
    }
  }

  return (
    <>
      <button
        className="inline-flex justify-center items-center gap-2 w-full p-2 bg-neutral-300 rounded-md font-sans font-semibold text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 transition-colors"
        onClick={() => inputRef.current?.click()}
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
        accept="gpx, kml"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  )
}

export { RouteUploading }
