import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../types';
import { HttpClient } from '../../services';

interface FetchCommentsError {
  message: string;
}
export const fetchCommentsAction = createAsyncThunk<Review[], {offerId: string}, { rejectValue: FetchCommentsError }>(
  'CITIES/GET_COMMENTS',
  async ({offerId}, thunkAPI) => {
    try {
      return await HttpClient.get<Review[]>(`/six-cities/comments/${offerId}`);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message
      });
    }
  }
);

