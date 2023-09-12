import * as L from 'leaflet'

import { DrawCoords } from '@/types/models/drawCoords.types'

const fitBounds = (map: L.Map | null, coords: DrawCoords[]) => {
  if (map && coords && coords.length > 0) {
    map.fitBounds(coords as any)
  }
}

export default fitBounds
