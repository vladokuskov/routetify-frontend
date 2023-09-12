import { MapConfig } from '@/types/global/mapConfig.types'

export const mapConfig: MapConfig = {
  initialCoords: {
    // Kyiv
    lat: 50.45,
    lng: 30.5241,
    zoom: 12,
  },
  layer: {
    default: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  },
}
