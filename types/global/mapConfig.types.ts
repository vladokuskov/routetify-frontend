export type MapConfig = {
  initialCoords: {
    lat: number
    lng: number
    zoom: number
  }
  lineColor: string
  layer: {
    default: string
    satellite: string
  }
}
