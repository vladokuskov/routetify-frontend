import Icon from '@/components/Icon/Icon'
import {
  toggleFileDragging,
  updateRouteFile,
} from '@/redux/features/fileUploadSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import FileImportIcon from '@/assets/icons/file-import.svg'

const RouteFileUploadDrag = () => {
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
      className="absolute r-0 top-0 w-full h-full z-50 p-6 bg-neutral-400 bg-opacity-30 transition-all"
      aria-label="Drop file"
      onDrop={handleDrop}
    >
      <div className="w-full h-full flex flex-col gap-2 items-center justify-center rounded-md border-neutral-200 border-dashed border-2 relative">
        <Icon
          svg={FileImportIcon}
          className="pointer-events-none text-neutral-50 dark:text-neutral-100"
          size={120}
        />
        <p className="font-roboto text-lg font-semibold text-neutral-50 dark:text-neutral-200  pointer-events-none">
          Drop file
        </p>
      </div>
    </aside>
  )
}

export { RouteFileUploadDrag }
