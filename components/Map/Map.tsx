'use-client'

import { useMemo } from 'react'
import MapControls from './MapControls/MapControls'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'

const Map = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const LeafletMap = useMemo(
    () =>
      dynamic(() => import('./LeafletMap/Map'), {
        ssr: false,
      }),
    [],
  )

  return (
    <div
      className={clsx(
        'h-full z-10 top-0 right-0 left-0 static',
        'max-sm:w-full max-sm:h-[70vh] fixed',
        isSidebarOpen ? 'w-[calc(100%-18.75rem)]' : 'w-[calc(100%-4rem)]',
      )}
    >
      <div className=" w-full h-full relative grid">
        <MapControls />
        <LeafletMap />
      </div>
    </div>
  )
}

export { Map }
