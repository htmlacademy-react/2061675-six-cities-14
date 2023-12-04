import { AppRoute, AuthorizationStatus, StateStatus } from '../../const';
import { authReducer } from './auth.ts';
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
    const initialState = {authorizationStatus: AuthorizationStatus.NoAuth};
    const expectedState = {authorizationStatus: AuthorizationStatus.Auth};

    const result = authReducer(initialState, loginAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
