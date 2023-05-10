import { DrawCoords } from '@/types/models/drawCoords.types'

const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}

export const calculateRouteDetails = (route: DrawCoords[]) => {
  let speed = 15
  let distance = 0
  let time = 0

  if (route) {
    for (let i = 0; i < route.length - 1; i++) {
      const { lat: lat1, lng: lon1 } = route[i]
      const { lat: lat2, lng: lon2 } = route[i + 1]
      distance += calculateDistance(+lat1, +lon1, +lat2, +lon2)
    }
    time = distance / speed
  }

  return { distance, time }
}
