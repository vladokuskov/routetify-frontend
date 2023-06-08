import { mapConfig } from '@/config/map'
import { DrawType } from '@/types/global/drawType.types'
import { Layer } from '@/types/global/layer.types'
import { LocationStatus } from '@/types/global/locationStatus.types'
import { ControlsState } from '@/types/global/redux.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as L from 'leaflet'

const initialState = {
  draw: DrawType.None,
  layer: Layer.default,
  location: LocationStatus.idle,
  isMarkerDragging: false,
  colorPicker: { color: mapConfig.lineColor.placed, isOpen: false },
  currentCoords: mapConfig.initialCoords,
  map: null,
} as ControlsState

export const controlsReducer = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    loadMap: (state, action: PayloadAction<L.Map>) => {
      return {
        ...state,
        map: action.payload,
      }
    },
    toggleIsMarkerDragging: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isMarkerDragging: action.payload,
      }
    },
    changeLocationStatus: (state, action: PayloadAction<LocationStatus>) => {
      return {
        ...state,
        location: action.payload,
      }
    },
    showColorPicker: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        colorPicker: { ...state.colorPicker, isOpen: action.payload },
      }
    },
    changeLineColor: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        colorPicker: { ...state.colorPicker, color: action.payload },
      }
    },
    changeDraw: (state, action) => {
      return {
        ...state,
        draw: action.payload,
      }
    },
    changeLayer: (state, action: PayloadAction<Layer>) => {
      return {
        ...state,
        layer: action.payload,
      }
    },
    changeCurrentCoords: (
      state,
      action: PayloadAction<{
        lat: number
        lng: number
        zoom: number
      }>,
    ) => {
      return {
        ...state,
        currentCoords: {
          lat: action.payload.lat,
          lng: action.payload.lng,
          zoom: action.payload.zoom,
        },
      }
    },
  },
})

export const {
  changeDraw,
  changeLayer,
  changeCurrentCoords,
  changeLineColor,
  showColorPicker,
  changeLocationStatus,
  toggleIsMarkerDragging,
  loadMap,
} = controlsReducer.actions
export default controlsReducer.reducer
