import { configureStore } from '@reduxjs/toolkit';
import { citiesReducer } from './reducer.ts';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
