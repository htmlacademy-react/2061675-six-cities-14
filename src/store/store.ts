import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { createAPI } from '../services';
import { redirect } from './middlewares';

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
