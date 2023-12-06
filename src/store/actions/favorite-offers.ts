import { createAction } from '@reduxjs/toolkit';
import { SelectedOffer } from '../../types';

export const addFavoriteOffersAction = createAction<{
  favoriteOffers: SelectedOffer[];
}>('FAVORITE/ADD_FAVORITES_OFFERS');
