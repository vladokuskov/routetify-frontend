import { configureStore } from '@reduxjs/toolkit'
import geocoderReducer from './features/geocoderSlice'
import controlsReducer from './features/controlsSlice'
import drawReducer from './features/drawSlice'
import fileUploadReducer from './features/fileUploadSlice'

export const store = configureStore({
  reducer: {
    geocoderReducer,
    controlsReducer,
    drawReducer,
    fileUploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
