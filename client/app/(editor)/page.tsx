'use client'

import { Map } from '@/components/Map/Map'
import { FilesDragAndDrop } from '@/components/FilesDragAndDrop/FilesDragAndDrop'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { toggleFileDragging } from '@/redux/features/fileUploadSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect, useRef } from 'react'

export default function Editor() {
  const isDragging = useAppSelector(
    (state) => state.fileUploadReducer.isDragging,
  )
  const dispatch = useAppDispatch()
  const dragLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(toggleFileDragging(true))

    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current)
      dragLeaveTimeoutRef.current = null
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!isDragging) {
      dispatch(toggleFileDragging(true))
    }
  }

  const handleDragLeave = () => {
    dragLeaveTimeoutRef.current = setTimeout(() => {
      dispatch(toggleFileDragging(false))
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (dragLeaveTimeoutRef.current) {
        clearTimeout(dragLeaveTimeoutRef.current)
      }
    }
  }, [])

  return (
    <main
      className="bg-app dark:bg-neutral-800 w-full h-full max-h-full flex items-start justify-start"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Sidebar />
      <Map />
      {isDragging && <FilesDragAndDrop />}
    </main>
  )
}
