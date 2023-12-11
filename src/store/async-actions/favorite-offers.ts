import { createAsyncThunk } from '@reduxjs/toolkit';
import { SelectedOffer } from '../../types';
import { HttpClient } from '../../services';

interface FavoritesOffersError {
  message: string;
}

export const fetchFavoriteOffersAction = createAsyncThunk<SelectedOffer[], undefined, {
  rejectValue: FavoritesOffersError;
}>(
  'FAVORITE/FETCH_FAVORITES_OFFERS',
  async (_, thunkAPI) => {
    try {
      return await HttpClient.get('/six-cities/favorite');
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message as string
      });
    }
  }
);

export const postFavoriteOfferAction = createAsyncThunk<SelectedOffer, { status: number; offerId: string }, {
  rejectValue: FavoritesOffersError;
}>(
  'FAVORITE/ADD_FAVORITES_OFFERS',
  async ({status, offerId}, thunkAPI) => {
    try {
      return await HttpClient.post(`/six-cities/favorite/${offerId}/${status}`, status);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message as string
      });
    }
  }
);


