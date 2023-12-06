import { FavoriteOffersState, favoritesOffersReducer, initialFavoriteOffersState } from './favorite-offers.ts';
import { StateStatus } from '../../const';
import { fetchFavoriteOffersAction, postFavoriteOfferAction } from '../async-actions';
import { SelectedOffer } from '../../types';
import { makeFakeSelectedOffer } from '../../utils';

describe('favorites offers reducer', () => {
  it('should set "Auth" with "fetchFavoriteOffersAction.pending" action', () => {
    const expectedState: FavoriteOffersState = {
      ...initialFavoriteOffersState,
      loading: true,
      status: StateStatus.loading,
    };

    const result = favoritesOffersReducer(initialFavoriteOffersState, fetchFavoriteOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "fetchFavoriteOffersAction.fulfilled" action', () => {
    const mockFavoriteOffers: SelectedOffer = makeFakeSelectedOffer();
    const expectedState: FavoriteOffersState = {
      ...initialFavoriteOffersState,
      loading: false,
      status: StateStatus.idle,
      favoriteOffers: [mockFavoriteOffers]
    };

    const result = favoritesOffersReducer(initialFavoriteOffersState, fetchFavoriteOffersAction.fulfilled([mockFavoriteOffers], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "fetchFavoriteOffersAction.pending" rejected', () => {
    const expectedState: FavoriteOffersState = {
      ...initialFavoriteOffersState,
      loading: false,
      status: StateStatus.idle,
    };

    const result = favoritesOffersReducer(initialFavoriteOffersState, fetchFavoriteOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "postFavoriteOfferAction.pending" fulfilled', () => {
    const mockFavoriteOffers: SelectedOffer = makeFakeSelectedOffer();
    const expectedState: FavoriteOffersState = {
      ...initialFavoriteOffersState,
      favoriteOffers: [mockFavoriteOffers],
    };

    const result = favoritesOffersReducer(initialFavoriteOffersState, postFavoriteOfferAction.fulfilled(mockFavoriteOffers, '', {offerId: '1', status: 1 | 0}));

    expect(result).toEqual(expectedState);
  });
});
