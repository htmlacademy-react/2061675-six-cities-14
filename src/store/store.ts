import { configureStore } from '@reduxjs/toolkit';
import { citiesReducer } from './reducer.ts';
import { loadingReducer } from './loading-reducer.ts';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
