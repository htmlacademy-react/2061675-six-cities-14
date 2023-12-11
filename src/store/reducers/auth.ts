import { AppRoute, AuthorizationStatus, StateStatus } from '../../const';
import { createReducer, createSelector, Reducer } from '@reduxjs/toolkit';
import { requireAuthorization, setUserInfoAction } from '../actions';
import { checkAuthAction, loginAction, logoutAction } from '../async-actions';
import { UserAuthData } from '../../types';
import { getToken } from '../../services';

export interface AuthState {
  authorizationStatus: AuthorizationStatus;
  status: StateStatus;
  loading: boolean;
  userInfo: UserAuthData | null;
  redirectTo: AppRoute;
}

export const authInitialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loading: false,
  status: StateStatus.idle,
  userInfo: null,
  redirectTo: AppRoute.Login
};

export const authReducer: Reducer<typeof authInitialState> = createReducer(authInitialState, (builder) =>
  builder
    .addCase(requireAuthorization, (state, {payload}) => ({
      ...state,
      authorizationStatus: payload.authorizationStatus
    }))
    .addCase(checkAuthAction.fulfilled, (state) => {
      if (getToken() !== '') {
        state.authorizationStatus = AuthorizationStatus.Auth;
      }
    })
    .addCase(checkAuthAction.rejected, (state) => ({
      ...state,
      authorizationStatus: AuthorizationStatus.NoAuth
    }))
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
