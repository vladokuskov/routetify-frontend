import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGeocoder {
  lat: number;
  lng: number;
  zoom?: number;
}

// Coords that used for map view, or center props in MapContainer
const initialState: IGeocoder = {
  lat: 50.45,
  lng: 30.5241,
  zoom: 9,
};

export const geocoder = createSlice({
  name: 'geocoderLatLng',
  initialState,
  reducers: {
    addLatLng: (state, action: PayloadAction<IGeocoder>) => {
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
        zoom: action.payload.zoom,
      };
    },
  },
});

export const { addLatLng } = geocoder.actions;
export default geocoder.reducer;
