import { AppRoute, AuthorizationStatus, StateStatus } from '../../const';
import { authReducer } from './auth.ts';

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
});
