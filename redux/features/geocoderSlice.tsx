import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GeocoderState {
  lat: number
  lng: number
  zoom?: number
}

const initialState = {
  lat: 50.45,
  lng: 30.5241,
  zoom: 9,
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
