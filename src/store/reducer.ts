import { City, OfferType } from '../types';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { changeCityAction, fillOffersAction, requireAuthorization } from './action.ts';
import { MockCities } from '../mocks';
import { AuthorizationStatus } from '../const/settings.ts';
import { fetchOffers } from './async-actions/fetch-offers.ts';

interface CitiesState {
  city: City;
  offers: OfferType[];
  authorizationStatus: AuthorizationStatus;
}

const initialState: CitiesState = {
  city: MockCities[1],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const citiesReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(changeCityAction, (state, {payload}) => ({
      ...state,
      city: payload.city,
    }))
    .addCase(fillOffersAction, (state, {payload}) => ({
      ...state,
      offers: payload.offers,
    }))
    .addCase(requireAuthorization, (state, {payload}) => ({
      ...state,
      authorizationStatus: payload.authorizationStatus,
    }))
    .addCase(fetchOffers.pending, (state) => ({
      ...state
    }))
    .addCase(fetchOffers.fulfilled, (state, {payload}) => ({
      ...state,
      offers: payload,
    }))
);

type WithCitiesState = {
  cities: CitiesState;
}

export const citiesStateSelector = (
  state: WithCitiesState,
): CitiesState => state.cities;

export const getSelectedCitySelector = createSelector(
  citiesStateSelector,
  (state) => state.city
);

export const getOffersSelector = createSelector(
  citiesStateSelector,
  (state) => state.offers
);
