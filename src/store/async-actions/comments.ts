import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, OfferType, PostReview, Review, RootState } from '../../types';
import { HttpClient } from '../../services';
import { AxiosInstance } from 'axios';
import { addCommentAction } from '../actions';

interface CommentsError {
  message: string;
}

export const fetchCommentsAction = createAsyncThunk<Review[], { offerId: string }, { rejectValue: CommentsError }>(
  'COMMENTS/GET_COMMENTS',
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


export const postCommentAction = createAsyncThunk<void, { commentData: PostReview; offerId: OfferType['id'] }, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'COMMENTS/POST_COMMENT',
  async ({commentData, offerId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review>(`/six-cities/comments/${offerId}`, commentData);
    dispatch(addCommentAction({comments: data}));
  }
);

