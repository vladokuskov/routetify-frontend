'use-client'

import { useMemo } from 'react'
import { StyledMapMainContainer, StyledMapContainer } from './Map.styles'
import MapControls from './MapControls/MapControls'
import dynamic from 'next/dynamic'

const Map = () => {
  const LeafletMap = useMemo(
    () =>
      dynamic(() => import('./LeafletMap/Map'), {
        ssr: false,
      }),
    [],
  )

  return (
    <StyledMapMainContainer>
      <StyledMapContainer>
        <MapControls />
        <LeafletMap />
      </StyledMapContainer>
    </StyledMapMainContainer>
  )
}

export { Map }
