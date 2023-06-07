'use-client'

import { useState } from 'react'

import * as L from 'leaflet'

import GetPositionByDragging from './GetDragPosition'
import useUpdateMapView from '../../../hooks/map/useUpdateMapView'
import useClickedCoords from '../../../hooks/map/useClickedCoords'

import StyleMap from './TileLayer'
import { MapContainer, ZoomControl } from 'react-leaflet'

import RenderLocationMarker from './RenderLocationMarker'
import useFitBoundsOnClick from '../../../hooks/map/useFitBoundsOnClick'
import RenderPolyline from './RenderPolyline'
import RenderMarkers from './RenderMarkers'
import useGetPositionByDrag from '@/hooks/map/useGetPositionByDrag'

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
        <RenderLocationMarker />
        <RenderMarkers map={map} />
        <RenderPolyline map={map} />
        <ZoomControl position="bottomleft" />
      </MapContainer>
    </>
  )
}

export default LeafletMap
