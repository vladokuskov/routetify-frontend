import { mapConfig } from '@/config/map'
import { GeocoderState } from '@/types/global/redux.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  lat: mapConfig.initialCoords.lat,
  lng: mapConfig.initialCoords.lng,
  zoom: mapConfig.initialCoords.zoom,
} as GeocoderState

export const geocoderReducer = createSlice({
  name: 'geocoder',
  initialState,
  reducers: {
    addLatLng: (state, action: PayloadAction<GeocoderState>) => {
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
        zoom: action.payload.zoom,
      }
    },
  },
})

export const { addLatLng } = geocoderReducer.actions
export default geocoderReducer.reducer
