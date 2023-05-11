import { mapConfig } from '@/config/map'
import { DrawType } from '@/types/global/drawType.types'
import { Layer } from '@/types/global/layer.types'
import { LocationStatus } from '@/types/global/locationStatus.types'
import { ControlsState } from '@/types/global/redux.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  draw: DrawType.None,
  layer: Layer.default,
  location: LocationStatus.idle,
  isFitBounds: false,
  colorPicker: { color: mapConfig.lineColor, isOpen: false },
  currentCoords: mapConfig.initialCoords,
} as ControlsState

export const controlsReducer = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    changeFitBounds: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isFitBounds: action.payload,
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
        currentCoords: { lat: number; lng: number; zoom: number }
      }>,
    ) => {
      return {
        ...state,
        currentCoords: {
          lat: action.payload.currentCoords.lat,
          lng: action.payload.currentCoords.lng,
          zoom: action.payload.currentCoords.zoom,
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
  changeFitBounds,
} = controlsReducer.actions
export default controlsReducer.reducer
