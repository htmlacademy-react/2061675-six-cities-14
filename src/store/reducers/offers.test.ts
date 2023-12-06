import { initialOffersState, offersReducer, OffersState } from './offers.ts';
import { StateStatus } from '../../const';
import { fetchOffersAction, getSelectedOfferAction } from '../async-actions';
import { OfferType, SelectedOffer } from '../../types';
import { makeFakeOffer, makeFakeSelectedOffer } from '../../utils';

describe('offers reducer', () => {
  it('should set "Offers" with "fetchOffersAction.pending" action', () => {
    const expectedState: OffersState = {
      ...initialOffersState,
      status: StateStatus.loading,
      loading: true,
    };

    const result = offersReducer(initialOffersState, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "Offers" with "fetchOffersAction.fulfilled" action', () => {
    const mockOffers: OfferType = makeFakeOffer();
    const expectedState: OffersState = {
      ...initialOffersState,
      loading: false,
      status: StateStatus.idle,
      offers: [mockOffers]
    };

    const result = offersReducer(initialOffersState, fetchOffersAction.fulfilled([mockOffers], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Offers" with "fetchOffersAction.rejected" action', () => {
    const expectedState: OffersState = {
      ...initialOffersState,
      status: StateStatus.idle,
      loading: false,
    };

    const result = offersReducer(initialOffersState, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Offers" with "getSelectedOfferAction.pending" action', () => {
    const expectedState: OffersState = {
      ...initialOffersState,
      status: StateStatus.loading,
      loading: true,
    };

    const result = offersReducer(initialOffersState, getSelectedOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "Offers" with "getSelectedOfferAction.fulfilled" action', () => {
    const mockSelectedOffers: SelectedOffer = makeFakeSelectedOffer();
    const expectedState: OffersState = {
      ...initialOffersState,
      loading: false,
      status: StateStatus.idle,
      selectedOffer: mockSelectedOffers
    };

    const result = offersReducer(initialOffersState, getSelectedOfferAction.fulfilled(mockSelectedOffers, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Offers" with "getSelectedOfferAction.rejected" action', () => {
    const expectedState: OffersState = {
      ...initialOffersState,
      status: StateStatus.idle,
      loading: false,
    };

    const result = offersReducer(initialOffersState, getSelectedOfferAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
