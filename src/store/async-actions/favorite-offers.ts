import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState, SelectedOffer } from '../../types';
import { HttpClient } from '../../services';
import { addFavoriteOffersAction } from '../actions/favorite-offers.ts';
import { AxiosInstance } from 'axios';

interface FavoritesOffersError {
  message: string;
}

export const fetchFavoriteOffersAction = createAsyncThunk<SelectedOffer[], undefined, {rejectValue: FavoritesOffersError}>(
  'FAVORITE/FETCH_FAVORITES_OFFERS',
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

export const postFavoriteOfferAction = createAsyncThunk<void, { status: number; offerId: string }, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'FAVORITE/ADD_FAVORITES_OFFERS',
  async ({ status, offerId }, { dispatch, extra: api }) => {
    const { data } = await api.post<SelectedOffer[]>(`/six-cities/favorite/${offerId}/${status}`, status);
    dispatch(addFavoriteOffersAction({ favoriteOffers: data }));
  }
);

