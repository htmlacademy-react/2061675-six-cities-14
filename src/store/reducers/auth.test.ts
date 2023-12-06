import { AppRoute, AuthorizationStatus, StateStatus } from '../../const';
import { authInitialState, authReducer, AuthState } from './auth.ts';
import { loginAction, logoutAction } from '../async-actions';
import { setUserInfoAction } from '../actions';
import { makeFakeUserInfo } from '../../utils';
import { UserAuthData } from '../../types';

describe('auth reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      status: StateStatus.idle,
      loading: false,
      userInfo: null,
      redirectTo: AppRoute.Login,
    };

    const result = authReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.pending" action', () => {
    const expectedState: AuthState = {
      ...authInitialState,
      status: StateStatus.loading,
      loading: true
    };

    const result = authReducer(authInitialState, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const expectedState: AuthState = {
      ...authInitialState,
      authorizationStatus: AuthorizationStatus.Auth,
      status: StateStatus.idle,
      loading: false
    };

    const result = authReducer(authInitialState, loginAction.fulfilled(undefined, '', {
      email: 'user@mail.ru',
      password: 'somepass234'
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.rejected" action', () => {
    const expectedState: AuthState = {
      ...authInitialState,
      status: StateStatus.idle,
      loading: false,
      authorizationStatus: AuthorizationStatus.NoAuth,
    };

    const result = authReducer(authInitialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "logoutAction.fulfilled" action', () => {
    const expectedState: AuthState = {
      ...authInitialState,
      authorizationStatus: AuthorizationStatus.NoAuth,
    };

    const result = authReducer(authInitialState, logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "setUserInfoAction" action', () => {
    const mockUserInfo: UserAuthData = makeFakeUserInfo();
    const expectedState: AuthState = {
      ...authInitialState,
      userInfo: mockUserInfo,
    };

    const result = authReducer(authInitialState, setUserInfoAction({userInfo: mockUserInfo}));

    expect(result).toEqual(expectedState);
  });
});
