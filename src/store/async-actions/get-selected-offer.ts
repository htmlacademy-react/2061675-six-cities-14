import { createAsyncThunk } from '@reduxjs/toolkit';
import { SelectedOffer } from '../../types';
import { HttpClient } from '../../services';

interface GetSelectedOfferError {
  message: string;
}

export const getSelectedOfferAction = createAsyncThunk<SelectedOffer, string, { rejectValue: GetSelectedOfferError }>(
  'CITIES/GET_SELECTED_OFFER',
  async (id, thunkAPI) => {
    try {
      return await HttpClient.get(`/six-cities/offers/${id}`);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message
      });
    }
  }
);
