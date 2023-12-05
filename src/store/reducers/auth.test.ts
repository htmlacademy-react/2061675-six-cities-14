import { AppRoute, AuthorizationStatus, StateStatus } from '../../const';
import { authInitialState, authReducer, AuthState } from './auth.ts';
import { loginAction } from '../async-actions';

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
});
