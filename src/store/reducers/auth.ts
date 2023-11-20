import { AuthorizationStatus } from '../../const/settings.ts';
import { StateStatus } from '../../const/state-status.ts';
import { createReducer, createSelector, Reducer } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../async-actions/login.ts';

interface AuthState {
  authorizationStatus: AuthorizationStatus;
  status: StateStatus;
  loading: boolean;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loading: false,
  status: StateStatus.idle,
};

export const authReducer: Reducer<typeof initialState> = createReducer(initialState, (builder) =>
  builder
    .addCase(checkAuthAction.pending, (state) => {
      state.loading = true;
      state.status = StateStatus.loading;
    })
    .addCase(checkAuthAction.fulfilled, (state) => ({
      ...state,
      authorizationStatus: AuthorizationStatus.Auth,
      loading: false,
      status: StateStatus.idle,
    }))
    .addCase(checkAuthAction.rejected, (state) => ({
      ...state,
      authorizationStatus: AuthorizationStatus.NoAuth,
      loading: false,
      status: StateStatus.idle,
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
