'use-client'

import { useState } from 'react'

import 'leaflet/dist/leaflet.css'

import * as L from 'leaflet'

import GetPositionByDragging from './GetDragPosition'
import useUpdateMapView from '../../../hooks/map/updateMapView'
import useClickedCoords from '../../../hooks/map/updateClickedCoords'
import useRenderPolyline from '../../../hooks/map/renderPolyline'
import useRenderMarkers from '../../../hooks/map/renderMarkers'

import StyleMap from './TileLayer'
import { MapContainer, ZoomControl } from 'react-leaflet'

import LocationMarker from './LocationMarker'
import useFitBoundsOnClick from '../../../hooks/map/fitBounds'

const LeafletMap = () => {
  const [map, setMap] = useState<L.Map | null>(null)

  useClickedCoords(map)
  useUpdateMapView(map)
  useRenderPolyline(map)
  useRenderMarkers(map)
  useFitBoundsOnClick(map)

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
      >
        <StyleMap />
        <GetPositionByDragging />
        <LocationMarker />
        <ZoomControl position="bottomleft" />
      </MapContainer>
    </>
  )
}

export default LeafletMap
