import { City, OfferType, SelectedOffer } from '../types';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { changeCityAction, fillOffersAction, requireAuthorization } from './action.ts';
import { AuthorizationStatus } from '../const/settings.ts';
import { fetchOffers } from './async-actions/fetch-offers.ts';
import { getSelectedOfferAction } from './async-actions/get-selected-offer.ts';
import { StateStatus } from '../const/state-status.ts';

interface CitiesState {
  city: City | undefined;
  offers: OfferType[];
  authorizationStatus: AuthorizationStatus;
  selectedOffer: SelectedOffer | undefined;
  status: StateStatus;
  loading: boolean;
}

const initialState: CitiesState = {
  city: undefined,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  selectedOffer: undefined,
  loading: false,
  status: StateStatus.idle,
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
      ...state,
      status: StateStatus.loading,
      loading: true,
    }))
    .addCase(fetchOffers.fulfilled, (state, {payload}) => ({
      ...state,
      offers: payload,
      status: StateStatus.idle,
      loading: false,
    }))
    .addCase(getSelectedOfferAction.pending, (state) => ({
      ...state,
      status: StateStatus.loading,
      loading: true,
    }))
    .addCase(getSelectedOfferAction.fulfilled, (state, {payload}) => ({
      ...state,
      selectedOffer: payload,
      status: StateStatus.idle,
      loading: false,
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

export const getLoadingSelector = createSelector(
  citiesStateSelector,
  (state) => state.loading
);
