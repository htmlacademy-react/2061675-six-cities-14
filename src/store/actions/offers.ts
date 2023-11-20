import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../../types';

export const getOffersRequestAction = createAction('OFFERS/GET_OFFERS_REQUEST');
export const getOffersSuccessAction = createAction<{
  offers: OfferType[];
}>('OFFERS/GET_OFFERS_SUCCESS');

export const getOffersFailureAction = createAction<{
  error: any;
}>('OFFERS/GET_OFFERS_FAILURE');
