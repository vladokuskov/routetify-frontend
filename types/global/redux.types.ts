import { DrawCoords } from '../models/drawCoords.types'
import { DrawType } from './drawType.types'
import { Layer } from './layer.types'
import { LocationStatus } from './locationStatus.types'
import * as L from 'leaflet'
import { movingPreferencesType } from './movingPreferencesType.types'

export type GeocoderState = {
  lat: number | null
  lng: number | null
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
  isMarkerDragging: boolean
  location: LocationStatus
  colorPicker: { color: string; isOpen: boolean }
  currentCoords: { lat: number; lng: number; zoom: number }
  map: L.Map | null
  isSidebarOpen: boolean
  movingPreference: movingPreferencesType
}
