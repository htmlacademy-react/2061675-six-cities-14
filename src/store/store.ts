import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './reducers';
import { createAPI } from '../services';
import { redirect } from './middlewares';
import { persistReducer } from 'redux-persist';

const api = createAPI();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: api
      }
    }).concat(redirect),
});
