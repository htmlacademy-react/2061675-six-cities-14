import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../const/cities.ts';
import { OfferType } from '../types';

export const changeCityAction = createAction<Cities>('CITIES/CHANGE_CITY');

export const fillOffersAction = createAction<OfferType[]>('CITIES/FILL_OFFERS');
