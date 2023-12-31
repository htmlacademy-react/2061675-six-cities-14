import { City } from '../../types';
import { StateStatus } from '../../const';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { changeCityAction } from '../actions';

export interface CitiesState {
  city: City | undefined;
  status: StateStatus;
  loading: boolean;
}

export const initialCitiesState: CitiesState = {
  city: undefined,
  loading: false,
  status: StateStatus.idle,
};

export const citiesReducer = createReducer(initialCitiesState, (builder) =>
  builder
    .addCase(changeCityAction, (state, {payload}) => ({
      ...state,
      city: payload.city,
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
