'use-client'

import { useEffect, useState } from 'react'

import * as L from 'leaflet'

import useClickedCoords from '../../../hooks/map/useClickedCoords'

import { MapContainer } from 'react-leaflet'
import StyleMap from './TileLayer'

import useGetPositionByDrag from '@/hooks/map/useGetPositionByDrag'
import RenderLocationMarker from './RenderLocationMarker'
import RenderMarkers from './RenderMarkers'
import RenderPolyline from './RenderPolyline'
import { useAppDispatch } from '@/redux/hooks'
import { loadMap } from '@/redux/features/controlsSlice'

const LeafletMap = () => {
  const [map, setMap] = useState<L.Map | null>(null)

  const dispatch = useAppDispatch()

  useClickedCoords(map)
  useGetPositionByDrag(map)

  useEffect(() => {
    if (map) {
      dispatch(loadMap(map))
    }
  }, [map])

  return (
    <>
      <MapContainer
        attributionControl={false}
        zoomControl={false}
        center={[50, 30]}
        zoom={9}
        minZoom={3}
        scrollWheelZoom={true}
        ref={setMap}
        style={{ cursor: 'crosshair' }}
        id="map"
      >
        <StyleMap />
        <RenderLocationMarker map={map} />
        <RenderMarkers map={map} />
        <RenderPolyline map={map} />
      </MapContainer>
    </>
  )
}

export default LeafletMap
