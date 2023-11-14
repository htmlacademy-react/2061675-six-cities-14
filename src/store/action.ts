import { createAction } from '@reduxjs/toolkit';
import { City } from '../types';

export const changeCityAction = createAction<{
  city: City;
}>('CITIES/CHANGE_CITY');

export const fillOffersAction = createAction('CITIES/FILL_OFFERS');
