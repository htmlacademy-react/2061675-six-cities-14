import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root-reducer.ts';
import { redirect } from './middlewares/redirect.ts';
import { createAPI } from '../services';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: api
      }
    }).concat(redirect),
});
