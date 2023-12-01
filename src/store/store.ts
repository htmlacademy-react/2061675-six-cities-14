import { configureStore } from '@reduxjs/toolkit';
import { citiesReducer } from './reducer.ts';
import { createAPI } from '../services';

export const api = createAPI();
export const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
