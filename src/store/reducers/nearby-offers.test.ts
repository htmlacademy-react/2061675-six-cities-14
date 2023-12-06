import { initialNearbyOffersState, nearbyOffersReducer, NearbyOffersState } from './nearby-offers.ts';
import { StateStatus } from '../../const';
import { getNearbyOffers } from '../async-actions';
import { OfferType } from '../../types';
import { makeFakeOffer } from '../../utils';

describe('nearby offers reducer', () => {
  it('should set "NearbyOffers" with "getNearbyOffers.pending" action', () => {
    const expectedState: NearbyOffersState = {
      ...initialNearbyOffersState,
      loading: true,
      status: StateStatus.loading,
    };

    const result = nearbyOffersReducer(initialNearbyOffersState, getNearbyOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "NearbyOffers" with "fetchFavoriteOffersAction.fulfilled" action', () => {
    const mockNearbyOffers: OfferType = makeFakeOffer();
    const expectedState: NearbyOffersState = {
      ...initialNearbyOffersState,
      loading: false,
      status: StateStatus.idle,
      nearbyOffers: [mockNearbyOffers]
    };

    const result = nearbyOffersReducer(initialNearbyOffersState, getNearbyOffers.fulfilled([mockNearbyOffers], '', {offerId: '1'}));

    expect(result).toEqual(expectedState);
  });

  it('should set "NearbyOffers" with "getNearbyOffers.rejected" action', () => {
    const expectedState: NearbyOffersState = {
      ...initialNearbyOffersState,
      loading: false,
      status: StateStatus.idle,
    };

    const result = nearbyOffersReducer(initialNearbyOffersState, getNearbyOffers.rejected);

    expect(result).toEqual(expectedState);
  });
});
