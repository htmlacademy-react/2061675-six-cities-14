import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root-reducer.ts';
import { redirect } from './middlewares/redirect.ts';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(redirect),
});
