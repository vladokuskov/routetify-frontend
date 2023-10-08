import { DrawCoords } from '@/types/models/drawCoords.types'
import axios from 'axios'

type Response = {
  elevation: number
  latitude: number
  longitude: number
}

const getElevation = async (coords: DrawCoords[]) => {
  try {
    const elevations: number[] = []
    let maxElevation = null
    let minElevation = null

    const convertedCoords = coords.map((coord) => {
      return { latitude: coord.lat, longitude: coord.lng }
    })

    const url = `https://api.open-elevation.com/api/v1/lookup`

    const response = await axios.post(url, { locations: convertedCoords })

    if (response.status === 429 || response.status === 503) {
      throw new Error(
        'Too many requests are coming to the server, please try again in a few seconds.',
      )
    }

    response.data.results.forEach((element: Response) => {
      elevations.push(element.elevation)
    })

    maxElevation = Math.max(...elevations).toString()
    minElevation = Math.min(...elevations).toString()

    return { maxElevation, minElevation }
  } catch (err) {}
}

export { getElevation }
