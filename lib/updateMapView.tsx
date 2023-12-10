const updateMapView = (
  map: L.Map | null,
  coordinates: { lat: number; lng: number; zoom: number },
): null => {
  if (map && coordinates && coordinates.lat && coordinates.lng) {
    map.setView([coordinates.lat, coordinates.lng], coordinates.zoom)
  }

  return null
}

export default updateMapView
