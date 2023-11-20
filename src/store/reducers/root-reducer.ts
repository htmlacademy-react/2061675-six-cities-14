import { combineReducers } from '@reduxjs/toolkit';
import { citiesReducer } from './cities.ts';
import { offersReducer } from './offers.ts';
import { loadingReducer } from './loading.ts';
import { authReducer } from './auth.ts';

export const rootReducer = combineReducers({
  cities: citiesReducer,
  offers: offersReducer,
  loading: loadingReducer,
  auth: authReducer,
});

