import { DrawCoords } from '../models/drawCoords.types'
import { DrawType } from './drawType.types'
import { Layer } from './layer.types'
import { LocationStatus } from './locationStatus.types'

export type GeocoderState = {
  lat: number
  lng: number
  zoom?: number
}

export type DrawState = {
  drawInfo: { time: string; dist: string }
  drawCoords: DrawCoords[]
  drawCoordsDeleted: DrawCoords[]
  drawCoordsFuture: DrawCoords[]
}

export type ControlsState = {
  draw: DrawType
  layer: Layer
  isFitBounds: boolean
  isMarkerDragging: boolean
  location: LocationStatus
  colorPicker: { color: string; isOpen: boolean }
  currentCoords: { lat: number; lng: number; zoom: number }
}
