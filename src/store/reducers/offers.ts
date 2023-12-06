import { OfferType, SelectedOffer } from '../../types';
import { StateStatus } from '../../const';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { fetchOffersAction, getSelectedOfferAction } from '../async-actions';

export interface OffersState {
  offers: OfferType[];
  selectedOffer: SelectedOffer | undefined;
  status: StateStatus;
  loading: boolean;
}

export const initialOffersState: OffersState = {
  offers: [],
  selectedOffer: undefined,
  loading: false,
  status: StateStatus.idle,
};

export const offersReducer = createReducer(initialOffersState, (builder) =>
  builder
    .addCase(fetchOffersAction.pending, (state) => ({
      ...state,
      status: StateStatus.loading,
      loading: true,
    }))
    .addCase(fetchOffersAction.fulfilled, (state, {payload}) => ({
      ...state,
      offers: payload,
      status: StateStatus.idle,
      loading: false,
    }))
    .addCase(fetchOffersAction.rejected, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          error: payload,
        };
      }
      return {
        ...state,
        status: StateStatus.idle,
        loading: false,
      };
    })
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
    .addCase(getSelectedOfferAction.rejected, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          error: payload,
        };
      }
      return {
        ...state,
        status: StateStatus.idle,
        loading: false,
      };
    })
);

type WithOffersState = {
  offers: OffersState;
}

export const offersStateSelector = (
  state: WithOffersState,
): OffersState => state.offers;

export const getOffersSelector = createSelector(
  offersStateSelector,
  (state) => state.offers
);

export const getSelectedOfferSelector = createSelector(
  offersStateSelector,
  (state) => state.selectedOffer
);

export const getLoadingSelector = createSelector(
  offersStateSelector,
  (state) => state.loading
);

export const getCitiesSelector = createSelector(
  getOffersSelector,
  (offers) => {
    const cities = [...new Map(offers.map((offer) => [offer.city['name'], offer.city])).values()];
    return cities.length ? cities : [
      {
        name: 'Amsterdam',
        location: {
          'latitude': 52.37454,
          'longitude': 4.897976,
          'zoom': 13
        }
      },
      {
        name: 'Paris',
        location: {
          'latitude': 48.85661,
          'longitude': 2.351499,
          'zoom': 13
        }
      },
      {
        name: 'Cologne',
        location: {
          'latitude': 50.938361,
          'longitude': 6.959974,
          'zoom': 13
        }
      },
      {
        name: 'Brussels',
        location: {
          'latitude': 50.846557,
          'longitude': 4.351697,
          'zoom': 13
        }
      },
      {
        name: 'Hamburg',
        location: {
          'latitude': 53.550341,
          'longitude': 10.000654,
          'zoom': 13
        }
      },
      {
        name: 'Dusseldorf',
        location: {
          'latitude': 51.225402,
          'longitude': 6.776314,
          'zoom': 13
        }
      },
    ];
  }
);
