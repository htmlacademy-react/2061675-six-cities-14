import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferType } from '../../types';
import { HttpClient } from '../../services';

interface GetNearbyOffersError {
  message: string;
}

export const getNearbyOffers = createAsyncThunk<OfferType[], { offerId: string },
  { rejectValue: GetNearbyOffersError }>
  (
    'NEARBY/GET_NEARBY_OFFERS',
    async ({offerId}, thunkAPI) => {
      try {
        return await HttpClient.get(`/six-cities/offers/${offerId}/nearby`);
      } catch (e: any) {
        return thunkAPI.rejectWithValue({
          message: e.message
        });
      }
    }
  );
