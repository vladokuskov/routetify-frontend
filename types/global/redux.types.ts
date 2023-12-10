import { DrawCoords, DrawCoordsChanges } from '../models/drawCoords.types'
import { DrawType } from './drawType.types'

import { LocationStatus } from './locationStatus.types'
import * as L from 'leaflet'
import { MovingPreferencesType } from './movingPreferencesType.types'
import { Layer } from './mapConfig.types'

export type GeocoderState = {
  lat: number | null
  lng: number | null
  zoom?: number
}

export type DrawState = {
  drawCoords: DrawCoords[]
  drawCoordsDeleted: DrawCoordsChanges[]
  drawCoordsChanges: DrawCoordsChanges[]
  activeWaypointIndex: number | null
}

export type ControlsState = {
  draw: DrawType
  layer: Layer
  isMarkerDragging: boolean
  location: LocationStatus
  currentCoords: { lat: number; lng: number; zoom: number }
  map: L.Map | null
  isSidebarOpen: boolean
  movingPreference: MovingPreferencesType
}

export type FileUploadState = {
  routeFile: File | null
}
