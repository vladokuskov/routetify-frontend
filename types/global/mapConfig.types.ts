export type MapConfig = {
  initialCoords: {
    lat: number
    lng: number
    zoom: number
  }
  lineColor: {
    placed: string
    preview: string
  }
  layer: {
    default: string
    satellite: string
  }
}
