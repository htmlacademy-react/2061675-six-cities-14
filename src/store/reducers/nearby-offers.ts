import { OfferType } from '../../types';
import { StateStatus } from '../../const';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { getNearbyOffers } from '../async-actions';

export interface NearbyOffersState {
  nearbyOffers: OfferType[];
  status: StateStatus;
  loading: boolean;
}

export const initialNearbyOffersState: NearbyOffersState = {
  nearbyOffers: [],
  loading: false,
  status: StateStatus.idle,
};

export const nearbyOffersReducer = createReducer(initialNearbyOffersState, (builder) =>
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
        loading: false
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
  (state) => state.nearbyOffers.slice(0, 3)
);
