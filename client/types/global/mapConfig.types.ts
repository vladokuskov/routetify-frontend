type InitialCoords = {
  lat: number
  lng: number
  zoom: number
}

export type Layer = {
  name: string
  title: string
  url: string
  secondaryLayers?: string[]
}

export type MapConfig = {
  initialCoords: InitialCoords
  layers: Layer[]
}
