import { OfferType, SelectedOffer } from '../../types';
import { StateStatus } from '../../const';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { fetchOffersAction, getSelectedOfferAction } from '../async-actions';

interface OffersState {
  offers: OfferType[];
  selectedOffer: SelectedOffer | undefined;
  status: StateStatus;
  loading: boolean;
}

const initialState: OffersState = {
  offers: [],
  selectedOffer: undefined,
  loading: false,
  status: StateStatus.idle,
};

export const offersReducer = createReducer(initialState, (builder) =>
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
  (offers) => [...new Map(offers.map((offer) => [offer.city['name'], offer.city])).values()]
);
