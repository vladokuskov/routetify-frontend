'use client'

import Icon from '@/components/ui/icon'
import { updateRouteFile } from '@/redux/features/fileUploadSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import FileImportIcon from '@/assets/icons/file-import.svg'
import { useEffect, useRef, useState } from 'react'

const FilesDragAndDrop = () => {
  const dispatch = useAppDispatch()
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const map = useAppSelector((state) => state.controlsReducer.map)

  const dragLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()

    if (e.dataTransfer && e.dataTransfer.files.length > 0 && map) {
      dispatch(updateRouteFile(e.dataTransfer.files[0]))
    }

    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current)
      dragLeaveTimeoutRef.current = null
    }
  }

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    if (!isDragging) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current)
      dragLeaveTimeoutRef.current = null
    }

    dragLeaveTimeoutRef.current = setTimeout(() => {
      setIsDragging(false)
    }, 200)
  }

  useEffect(() => {
    window.addEventListener('dragstart', (e) => handleDragEnter(e))
    window.addEventListener('dragend', (e) => handleDragLeave(e))
    window.addEventListener('dragover', (e) => handleDragOver(e))
    window.addEventListener('dragleave', (e) => handleDragLeave(e))

    return () => {
      window.removeEventListener('dragstart', (e) => handleDragEnter(e))
      window.removeEventListener('dragend', (e) => handleDragLeave(e))
      window.removeEventListener('dragover', (e) => handleDragOver(e))
      window.removeEventListener('dragleave', (e) => handleDragLeave(e))
    }
  }, [])

  if (!isDragging) {
    return null
  }

  return (
    <aside
      className="absolute r-0 top-0 w-full h-full z-50 bg-neutral-900/30 transition-all"
      aria-label="Drop file"
      onDrop={(e) => handleDrop(e)}
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
