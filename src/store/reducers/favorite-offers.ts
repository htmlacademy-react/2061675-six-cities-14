import { SelectedOffer } from '../../types';
import { StateStatus } from '../../const';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { fetchFavoriteOffersAction, postFavoriteOfferAction } from '../async-actions';

export interface FavoriteOffersState {
  favoriteOffers: SelectedOffer[];
  status: StateStatus;
  loading: boolean;
}

export const initialFavoriteOffersState: FavoriteOffersState = {
  favoriteOffers: [],
  loading: false,
  status: StateStatus.idle,
};

export const favoritesOffersReducer = createReducer(initialFavoriteOffersState, (builder) =>
  builder
    .addCase(fetchFavoriteOffersAction.pending, (state) => ({
      ...state,
      loading: true,
      status: StateStatus.loading,
    }))
    .addCase(fetchFavoriteOffersAction.fulfilled, (state, {payload}) => ({
      ...state,
      favoriteOffers: payload,
      status: StateStatus.idle,
      loading: false,
    }))
    .addCase(fetchFavoriteOffersAction.rejected, (state, {payload}) => {
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
    .addCase(postFavoriteOfferAction.fulfilled, (state, {payload}) => {
      const isFavorite = payload.isFavorite;

      if (isFavorite) {
        state.favoriteOffers.push(payload);
      }

      if (!isFavorite) {
        state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== payload.id);
      }
    })
);

type WithFavoriteOffersState = {
  favoriteOffers: FavoriteOffersState;
}

export const favoriteOffersStateSelector = (
  state: WithFavoriteOffersState,
): FavoriteOffersState => state.favoriteOffers;

export const getFavoriteOffersStateSelector = createSelector(
  favoriteOffersStateSelector,
  (state) => state.favoriteOffers
);

export const getFavoriteOffersNumberStateSelector = createSelector(
  favoriteOffersStateSelector,
  (state) => state.favoriteOffers.length
);

