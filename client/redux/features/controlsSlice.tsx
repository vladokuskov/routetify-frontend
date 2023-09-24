import { mapConfig } from '@/config/map'
import { DrawType } from '@/types/global/drawType.types'
import { Layer } from '@/types/global/layer.types'
import { LocationStatus } from '@/types/global/locationStatus.types'
import { MovingPreferencesType } from '@/types/global/movingPreferencesType.types'
import { ControlsState } from '@/types/global/redux.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as L from 'leaflet'

const initialState: ControlsState = {
  draw: DrawType.None,
  layer: Layer.default,
  location: LocationStatus.idle,
  isMarkerDragging: false,
  currentCoords: mapConfig.initialCoords,
  map: null,
  isSidebarOpen: true,
  movingPreference: MovingPreferencesType.bike,
}

export const controlsReducer = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    changeMovingPreferences: (
      state,
      action: PayloadAction<MovingPreferencesType>,
    ) => {
      return {
        ...state,
        movingPreference: action.payload,
      }
    },
    changeSidebarOpenState: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSidebarOpen: action.payload,
      }
    },
    toggleIsSidebarOpen: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          isSidebarOpen: action.payload,
        }
      } else
        return {
          ...state,
          isSidebarOpen: !state.isSidebarOpen,
        }
    },
    loadMap: (state, action: PayloadAction<L.Map | null>) => {
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
  changeLocationStatus,
  toggleIsMarkerDragging,
  loadMap,
  toggleIsSidebarOpen,
  changeMovingPreferences,
  changeSidebarOpenState,
} = controlsReducer.actions
export default controlsReducer.reducer
