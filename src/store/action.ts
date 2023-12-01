import { createAction } from '@reduxjs/toolkit';
import { City, OfferType } from '../types';
import { AuthorizationStatus } from '../const/settings.ts';

export const changeCityAction = createAction<{
  city: City | undefined;
}>('CITIES/CHANGE_CITY');

export const fillOffersAction = createAction<{
  offers: OfferType[];
}>('CITIES/FILL_OFFERS');

export const requireAuthorization = createAction<{
  authorizationStatus: AuthorizationStatus;
}>('USER/REQUIRE_AUTHORIZATION');
