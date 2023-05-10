import { Circle } from 'react-leaflet'
import { useEffect, useState } from 'react'

import { useAppSelector } from '@/redux/hooks'
import { LatLngExpression } from 'leaflet'
import { LocationStatus } from '@/types/global/index.types'

function LocationMarker() {
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

  function LocationMarkerInner() {
    return position === null ? null : (
      <Circle center={position} radius={120} fillOpacity={0.5} />
    )
  }

  return <LocationMarkerInner />
}

export default LocationMarker
