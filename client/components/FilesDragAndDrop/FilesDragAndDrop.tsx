import Icon from '@/components/ui/icon'
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
      className="absolute r-0 top-0 w-full h-full z-50 bg-neutral-900/30 transition-all"
      aria-label="Drop file"
      onDrop={handleDrop}
    >
      <div className="w-full h-8 flex gap-2 items-center justify-center relative bg-primary text-black">
        <Icon svg={FileImportIcon} className="pointer-events-none " size={20} />
        <p className="font-roboto font-semibold pointer-events-none text-sm">
          Drop file
        </p>
      </div>
    </aside>
  )
}

export { FilesDragAndDrop }
