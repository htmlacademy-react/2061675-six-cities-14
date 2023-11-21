import { OfferType } from '../../types';
import { StateStatus } from '../../const';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { getNearbyOffers } from '../async-actions';

interface NearbyOffersState {
  nearbyOffers: OfferType[];
  status: StateStatus;
  loading: boolean;
}

const initialState: NearbyOffersState = {
  nearbyOffers: [],
  loading: false,
  status: StateStatus.idle,
};

export const nearbyOffersReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getNearbyOffers.pending, (state) => ({
      ...state,
      loading: true,
      status: StateStatus.loading,
    }))
    .addCase(getNearbyOffers.fulfilled, (state, {payload}) => ({
      ...state,
      nearbyOffers: payload,
      status: StateStatus.idle,
      loading: false,
    }))
    .addCase(getNearbyOffers.rejected, (state, {payload}) => {
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

type WithNearbyOffersState = {
  nearbyOffers: NearbyOffersState;
}

export const nearbyOffersSelector = (
  state: WithNearbyOffersState,
): NearbyOffersState => state.nearbyOffers;

export const getNearbyOffersSelector = createSelector(
  nearbyOffersSelector,
  (state) => state.nearbyOffers
);
