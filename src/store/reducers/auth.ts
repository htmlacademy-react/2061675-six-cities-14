import { AppRoute, AuthorizationStatus } from '../../const';
import { StateStatus } from '../../const';
import { createReducer, createSelector, Reducer } from '@reduxjs/toolkit';
import { requireAuthorization, setUserInfoAction } from '../actions';
import { loginAction, logoutAction } from '../async-actions';
import { UserAuthData } from '../../types';

interface AuthState {
  authorizationStatus: AuthorizationStatus;
  status: StateStatus;
  loading: boolean;
  userInfo: UserAuthData | null;
  redirectTo: AppRoute;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loading: false,
  status: StateStatus.idle,
  userInfo: null,
  redirectTo: AppRoute.Login
};

export const authReducer: Reducer<typeof initialState> = createReducer(initialState, (builder) =>
  builder
    .addCase(requireAuthorization, (state, {payload}) => ({
      ...state,
      authorizationStatus: payload.authorizationStatus
    }))
    // .addCase(checkAuthAction.pending, (state) => ({
    //   ...state,
    //   loading: true,
    //   status: StateStatus.loading,
    // }))
    // .addCase(checkAuthAction.fulfilled, (state) => ({
    //   ...state,
    //   authorizationStatus: AuthorizationStatus.Auth,
    //   loading: false,
    //   status: StateStatus.idle,
    // }))
    // .addCase(checkAuthAction.rejected, (state) => ({
    //   ...state,
    //   authorizationStatus: AuthorizationStatus.NoAuth,
    //   loading: false,
    //   status: StateStatus.idle,
    // }))
    .addCase(loginAction.pending, (state) => ({
      ...state,
      loading: true,
      status: StateStatus.loading,
    }))
    .addCase(loginAction.fulfilled, (state) => ({
      ...state,
      authorizationStatus: AuthorizationStatus.Auth,
      loading: false,
      status: StateStatus.idle,
    }))
    .addCase(loginAction.rejected, (state) => ({
      ...state,
      authorizationStatus: AuthorizationStatus.NoAuth,
      loading: false,
      status: StateStatus.idle,
    }))
    .addCase(logoutAction.fulfilled, (state) => ({
      ...state,
      authorizationStatus: AuthorizationStatus.NoAuth,
    }))
    .addCase(setUserInfoAction, (state, {payload}) => ({
      ...state,
      userInfo: payload.userInfo
    }))
);

type WithAuthState = {
  auth: AuthState;
}
export const authStateSelector = (
  state: WithAuthState,
): AuthState => state.auth;

export const getAuthorizationStatusSelector = createSelector(
  authStateSelector,
  (state) => state.authorizationStatus
);

export const getUserInfoSelector = createSelector(
  authStateSelector,
  (state) => state.userInfo
);
