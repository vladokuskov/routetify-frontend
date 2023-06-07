import { useAppSelector } from '../../redux/hooks'
import { useEffect } from 'react'

const useUpdateMapView = (map: L.Map | null) => {
  const geocoderCoords = useAppSelector((state) => state.geocoderReducer)

  useEffect(() => {
    if (!map) return

    if (map) {
      map.setView([geocoderCoords.lat, geocoderCoords.lng], geocoderCoords.zoom)
    }
  }, [map, geocoderCoords])
}
export default useUpdateMapView
