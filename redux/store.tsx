import geocoder from './features/geocoder';
import controls from './features/controls';
import draw from './features/map';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    geocoder,
    controls,
    draw,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
