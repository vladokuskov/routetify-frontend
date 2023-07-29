import { useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import * as L from 'leaflet'
import { LatLngExpression, Map } from 'leaflet'
import { useEffect, useState } from 'react'

const RenderLocationMarker = ({ map }: { map: Map | null }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null)
  const [userDirection, setUserDirection] = useState<number | null>(null) // Add user direction state

  const locationStatus = useAppSelector(
    (state) => state.controlsReducer.location,
  )

  const geocoderCoords = useAppSelector((state) => state.geocoderReducer)

  useEffect(() => {
    if (
      locationStatus === LocationStatus.success &&
      geocoderCoords.lat &&
      geocoderCoords.lng
    ) {
      setPosition({ lat: geocoderCoords.lat, lng: geocoderCoords.lng })
    } else {
      const timer: number = window.setTimeout(() => {
        setPosition(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [locationStatus])

  useEffect(() => {
    if (map && position) {
      const marker = L.circle(position, {
        radius: 1000,
        fillOpacity: 0.5,
        stroke: false,
        className: 'cursorCrosshair',
      })
      marker.addTo(map)

      return () => {
        map.removeLayer(marker)
      }
    }
  }, [map, position])

  return null
}

export default RenderLocationMarker
