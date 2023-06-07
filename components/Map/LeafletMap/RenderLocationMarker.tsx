import { useEffect, useState } from 'react'
import * as L from 'leaflet'
import { LatLngExpression, Map } from 'leaflet'
import { useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'

const RenderLocationMarker = ({ map }: { map: Map | null }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null)

  const locationStatus = useAppSelector(
    (state) => state.controlsReducer.location,
  )

  const currentCoords = useAppSelector(
    (state) => state.controlsReducer.currentCoords,
  )

  useEffect(() => {
    if (locationStatus === LocationStatus.success) {
      setPosition(currentCoords)
    } else {
      const timer: number = window.setTimeout(() => {
        setPosition(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [locationStatus, currentCoords])

  useEffect(() => {
    if (map && position) {
      const marker = L.circle(position, { radius: 120, fillOpacity: 0.5 })
      marker.addTo(map)

      return () => {
        map.removeLayer(marker)
      }
    }
  }, [map, position])

  return null
}

export default RenderLocationMarker
