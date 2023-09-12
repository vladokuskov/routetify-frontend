export type MapConfig = {
  initialCoords: {
    lat: number
    lng: number
    zoom: number
  }
  layer: {
    default: string
    satellite: string
  }
}
