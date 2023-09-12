import { FileUploadState } from '@/types/global/redux.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  routeFile: null,
  isDragging: false,
} as FileUploadState

export const controlsReducer = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    updateRouteFile: (state, action: PayloadAction<File | null>) => {
      return {
        ...state,
        routeFile: action.payload,
      }
    },
    toggleFileDragging: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isDragging: action.payload,
      }
    },
  },
})

export const { updateRouteFile, toggleFileDragging } = controlsReducer.actions
export default controlsReducer.reducer
