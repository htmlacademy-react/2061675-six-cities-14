import { City, OfferType, SelectedOffer } from '../types';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { changeCityAction, fillOffersAction, requireAuthorization } from './action.ts';
import { AuthorizationStatus } from '../const/settings.ts';
import { fetchOffers } from './async-actions/fetch-offers.ts';
import { getSelectedOfferAction } from './async-actions/get-selected-offer.ts';

interface CitiesState {
  city: City | undefined;
  offers: OfferType[];
  authorizationStatus: AuthorizationStatus;
  selectedOffer: SelectedOffer | undefined;
}

const initialState: CitiesState = {
  city: undefined,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  selectedOffer: undefined,
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
    .addCase(getSelectedOfferAction.pending, (state) => ({
      ...state,
    }))
    .addCase(getSelectedOfferAction.fulfilled, (state, {payload}) => ({
      ...state,
      selectedOffer: payload
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

export const getCitiesSelector = createSelector(
  getOffersSelector,
  (offers) => [...new Map(offers.map((offer) => [offer.city['name'], offer.city])).values()]
);

export const getSelectedOfferSelector = createSelector(
  citiesStateSelector,
  (state) => state.selectedOffer
);
