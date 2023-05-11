import { DrawCoords } from '../models/drawCoords.types'
import { DrawType, Layer, LocationStatus } from './index.types'

export type GeocoderState = {
  lat: number
  lng: number
  zoom?: number
}

export type DrawState = {
  drawInfo: { time: string; dist: string }
  drawCoords: DrawCoords[]
  exportCoords: DrawCoords[]
  drawCoordsDeleted: DrawCoords[]
  drawCoordsFuture: DrawCoords[]
}

export type ControlsState = {
  draw: DrawType
  layer: Layer
  isFitBounds: boolean
  location: LocationStatus
  colorPicker: { color: string; isOpen: boolean }
  currentCoords: { lat: number; lng: number; zoom: number }
}
