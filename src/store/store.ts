import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root-reducer.ts';
import { createAPI } from '../services';
import { redirect } from './middlewares/redirect.ts';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect),
});
