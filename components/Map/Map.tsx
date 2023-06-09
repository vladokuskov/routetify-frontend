'use-client'

import { useMemo } from 'react'
import { StyledMapMainContainer, StyledMapContainer } from './Map.styles'
import MapControls from './MapControls/MapControls'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/redux/hooks'

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
    <StyledMapMainContainer isSidebarOpen={isSidebarOpen}>
      <StyledMapContainer>
        <MapControls />
        <LeafletMap />
      </StyledMapContainer>
    </StyledMapMainContainer>
  )
}

export { Map }
