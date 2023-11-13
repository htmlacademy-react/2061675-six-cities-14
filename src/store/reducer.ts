import { OfferType } from '../types';
import { Cities } from '../const/cities.ts';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { changeCityAction, fillOffersAction } from './action.ts';

interface CitiesState {
  city: Cities;
  offers: OfferType[];
}

const initialState: CitiesState = {
  city: Cities.Amsterdam,
  offers: [],
};

export const citiesReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(changeCityAction, (state, {payload}) => ({
      ...state,
      city: payload,
    }))
    .addCase(fillOffersAction, (state, {payload}) => ({
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

export const getCitiesSelector = createSelector(
  citiesStateSelector,
  (state) => state.city
);
