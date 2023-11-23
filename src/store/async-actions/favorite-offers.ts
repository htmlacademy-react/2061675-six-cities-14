import { createAsyncThunk } from '@reduxjs/toolkit';
import { SelectedOffer } from '../../types';
import { HttpClient } from '../../services';

interface FavoritesOffersError {
  message: string;
}

export const fetchFavoriteOffersAction = createAsyncThunk<SelectedOffer[], undefined, {rejectValue: FavoritesOffersError}>(
  'FAVOTITE/FETCH_FAVORITES_OFFERS',
  async (_, thunkAPI) => {
    try {
      return await HttpClient.get('/six-cities/favorite');
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message
      });
    }
  }
);

