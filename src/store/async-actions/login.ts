import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const';
import { dropToken, saveToken } from '../../services';
import { AppDispatch, Auth, RootState, UserAuthData } from '../../types';
import { AxiosInstance } from 'axios';
import { redirectToRoute, requireAuthorization, setUserInfoAction } from '../actions';
import browserHistory from '../../browser-history.ts';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'USER/CHECK_AUTH',
  async (_, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserAuthData>(`/six-cities${APIRoute.Login}`);
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
      dispatch(setUserInfoAction({userInfo: data}));
    } catch {
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
      dispatch(setUserInfoAction({userInfo: null}));
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
    const {data: {token}} = await api.post<UserAuthData>(`/six-cities${APIRoute.Login}`, {email, password});
    saveToken(token);
    dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
    dispatch(redirectToRoute({appRoute: AppRoute.Main}));
    browserHistory.push(AppRoute.Main);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'USER/LOGOUT',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(`/six-cities${APIRoute.Logout}`);
    dropToken();
    dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
  },
);
