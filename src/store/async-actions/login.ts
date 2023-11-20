import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const/settings.ts';
import { dropToken, saveToken } from '../../services';
import { AppDispatch, Auth, RootState, UserAuthData } from '../../types';
import { AxiosInstance } from 'axios';
import { redirectToRoute, requireAuthorization } from '../actions';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'USER/CHECK_AUTH',
  async (_, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
    } catch {
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
    }
  }
);

export const loginAction = createAsyncThunk<void, Auth, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'USER/LOGIN',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserAuthData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
    dispatch(redirectToRoute({appRoute: AppRoute.Main}));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'USER/LOGOUT',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
  },
);
