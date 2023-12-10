import { MapConfig } from '@/types/global/mapConfig.types'

export const mapConfig: MapConfig = {
  initialCoords: {
    // Kyiv
    lat: 50.45,
    lng: 30.5241,
    zoom: 12,
  },
  layers: [
    {
      name: 'default',
      title: 'OSM',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    },

    {
      name: 'cyclosm',
      title: 'CyclOSM',
      url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    },

    {
      name: 'satellite-1',
      title: 'Satellite 1',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    },
  ],
}
