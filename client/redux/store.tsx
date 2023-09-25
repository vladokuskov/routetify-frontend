import { combineReducers, configureStore } from '@reduxjs/toolkit'
import geocoderReducer from './features/geocoderSlice'
import controlsReducer from './features/controlsSlice'
import drawReducer from './features/drawSlice'
import fileUploadReducer from './features/fileUploadSlice'
import userReducer from './features/userSlice'
import type { PreloadedState } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  geocoderReducer,
  controlsReducer,
  drawReducer,
  fileUploadReducer,
  userReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
