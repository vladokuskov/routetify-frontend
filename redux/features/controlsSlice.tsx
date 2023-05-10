import { DrawType } from '@/types/global/index.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ControlsState {
  draw: DrawType;
  layer: string;
  isFitBounds: boolean;
  isLocationFound: boolean;
  colorPicker: { color: string; isOpen: boolean };
  currentCoords: { lat: number; lng: number };
}

const initialState = {
  draw: DrawType.None,
  layer: 'default',
  isLocationFound: false,
  isFitBounds: false,
  colorPicker: { color: '#00ACC1', isOpen: false },
  currentCoords: {
    lat: 50.45,
    lng: 30.5241,
  },
} as ControlsState;

export const controlsReducer = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    changeFitBounds: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isFitBounds: action.payload,
      };
    },
    changeLocationStatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLocationFound: action.payload,
      };
    },
    showColorPicker: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        colorPicker: { ...state.colorPicker, isOpen: action.payload },
      };
    },
    changeLineColor: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        colorPicker: { ...state.colorPicker, color: action.payload },
      };
    },
    changeDraw: (state, action) => {
      return {
        ...state,
        draw: action.payload,
      };
    },
    changeLayer: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        layer: action.payload,
      };
    },
    changeCurrentCoords: (
      state,
      action: PayloadAction<{
        currentCoords: { lat: number; lng: number };
      }>
    ) => {
      return {
        ...state,
        currentCoords: {
          lat: action.payload.currentCoords.lat,
          lng: action.payload.currentCoords.lng,
        },
      };
    },
  },
});

export const {
  changeDraw,
  changeLayer,
  changeCurrentCoords,
  changeLineColor,
  showColorPicker,
  changeLocationStatus,
  changeFitBounds,
} = controlsReducer.actions;
export default controlsReducer.reducer;
