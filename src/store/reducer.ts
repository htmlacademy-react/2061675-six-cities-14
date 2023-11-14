import { City, OfferType } from '../types';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { changeCityAction, fillOffersAction } from './action.ts';
import { MockCities } from '../mocks';

interface CitiesState {
  city: City;
  offers: OfferType[];
}

const initialState: CitiesState = {
  city: MockCities[1],
  offers: [],
};

export const citiesReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(changeCityAction, (state, {payload}) => ({
      ...state,
      city: payload.city,
    }))
    .addCase(fillOffersAction, (state) => ({
      ...state,
    }))
);

type WithCitiesState = {
  city: CitiesState;
}

export const citiesStateSelector = (
  state: WithCitiesState,
): CitiesState => state.city;

export const getSelectedCitySelector = createSelector(
  citiesStateSelector,
  (state) => state.city
);
