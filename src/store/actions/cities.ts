import { createAction } from '@reduxjs/toolkit';
import { City } from '../../types';

export const changeCityAction = createAction<{
  city: City | undefined;
}>('CITIES/CHANGE_CITY');
