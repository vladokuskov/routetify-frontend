import { FileUploadState } from '@/types/global/redux.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: FileUploadState = {
  routeFile: null,
}

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
  },
})

export const { updateRouteFile } = controlsReducer.actions
export default controlsReducer.reducer
