import { MovingPreferencesType } from '@/types/global/movingPreferencesType.types'
import { DrawCoords } from '@/types/models/drawCoords.types'

const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) => {
  const R = 6371 // Radius of the earth in km

  // Calculating the differences in latitude and longitude
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lng2 - lng1)

  // Calculating the intermediate values
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  // Calculating the final distance
  const distance = R * c
  return distance
}

// Function to convert degrees to radians
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}

// Function to calculate route details
export const calculateRouteDetails = (
  route: DrawCoords[],
  movingPreference: MovingPreferencesType,
) => {
  let speed =
    movingPreference === MovingPreferencesType.walk
      ? 4.5
      : movingPreference === MovingPreferencesType.bike
      ? 15.5
      : 87.5 // Speed in km/h
  let distance = 0 // Total distance initialized to zero
  let time = 0 // Total time initialized to zero

  // Checking if the route Array is valid
  if (route) {
    // Iterating through each pair of coordinates in the route
    for (let i = 0; i < route.length - 1; i++) {
      const { lat: lat1, lng: lon1 } = route[i]
      const { lat: lat2, lng: lon2 } = route[i + 1]

      // Calculating the distance between consecutive coordinates and adding it to the total distance
      distance += calculateDistance(+lat1, +lon1, +lat2, +lon2)
    }

    // Calculating the time based on the total distance and speed
    time = distance / speed
  }

  return { distance, time }
}
