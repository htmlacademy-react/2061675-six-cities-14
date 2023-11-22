import { combineReducers } from '@reduxjs/toolkit';
import { citiesReducer } from './cities.ts';
import { offersReducer } from './offers.ts';
import { loadingReducer } from './loading.ts';
import { authReducer } from './auth.ts';
import { nearbyOffersReducer } from './nearby-offers.ts';
import { commentsReducer } from './comments.ts';

export const rootReducer = combineReducers({
  cities: citiesReducer,
  offers: offersReducer,
  loading: loadingReducer,
  auth: authReducer,
  nearbyOffers: nearbyOffersReducer,
  comments: commentsReducer,
});

