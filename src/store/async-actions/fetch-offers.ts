import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferType } from '../../types';
import { HttpClient } from '../../services';

interface FetchOffersError {
  message: string;
}

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, { rejectValue: FetchOffersError }>(
  'CITIES/FETCH_OFFERS',
  async (_, thunkAPI) => {
    try {
      return await HttpClient.get('/six-cities/offers');
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message as string
      });
    }
  }
);
