'use-client'

import { useState } from 'react'

import * as L from 'leaflet'

import useClickedCoords from '../../../hooks/map/useClickedCoords'
import useUpdateMapView from '../../../hooks/map/useUpdateMapView'

import { MapContainer, ZoomControl } from 'react-leaflet'
import StyleMap from './TileLayer'

import useGetPositionByDrag from '@/hooks/map/useGetPositionByDrag'
import useFitBoundsOnClick from '../../../hooks/map/useFitBoundsOnClick'
import RenderLocationMarker from './RenderLocationMarker'
import RenderMarkers from './RenderMarkers'
import RenderPolyline from './RenderPolyline'

const LeafletMap = () => {
  const [map, setMap] = useState<L.Map | null>(null)

  useClickedCoords(map)
  useUpdateMapView(map)
  useFitBoundsOnClick(map)
  useGetPositionByDrag(map)

  return (
    <>
      <MapContainer
        attributionControl={false}
        zoomControl={false}
        center={[50, 30]}
        zoom={9}
        minZoom={2}
        scrollWheelZoom={true}
        ref={setMap}
        style={{ cursor: 'crosshair' }}
      >
        <StyleMap />
        <RenderLocationMarker map={map} />
        <RenderMarkers map={map} />
        <RenderPolyline map={map} />
        <ZoomControl position="bottomleft" />
      </MapContainer>
    </>
  )
}

export default LeafletMap
