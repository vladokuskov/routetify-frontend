import Icon from '@/components/Icon/Icon'
import {
  toggleFileDragging,
  updateRouteFile,
} from '@/redux/features/fileUploadSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import FileImportIcon from '@/assets/icons/file-import.svg'

const FilesDragAndDrop = () => {
  const dispatch = useAppDispatch()
  const map = useAppSelector((state) => state.controlsReducer.map)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (e.dataTransfer.files.length > 0 && map) {
      dispatch(updateRouteFile(e.dataTransfer.files[0]))
    }

    dispatch(toggleFileDragging(false))
  }

  return (
    <aside
      className="absolute r-0 top-0 w-full h-full z-50 bg-neutral-900 bg-opacity-30 transition-all"
      aria-label="Drop file"
      onDrop={handleDrop}
    >
      <div className="w-full h-6 flex gap-2 items-center justify-center relative bg-green-400">
        <Icon
          svg={FileImportIcon}
          className="pointer-events-none text-white"
          size={20}
        />
        <p className="font-roboto text-lg font-semibold text-white pointer-events-none">
          Drop file
        </p>
      </div>
    </aside>
  )
}

export { FilesDragAndDrop }
