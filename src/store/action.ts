import { createAction } from '@reduxjs/toolkit';
import { City, OfferType } from '../types';

export const changeCityAction = createAction<{
  city: City;
}>('CITIES/CHANGE_CITY');

export const fillOffersAction = createAction<{
  offers: OfferType[];
}>('CITIES/FILL_OFFERS');
