import { Auth, RootState } from '../../types';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes } from '../../utils';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  authInitialState,
  initialCitiesState,
  initialCommentState, initialFavoriteOffersState,
  initialNearbyOffersState,
  initialOffersState
} from '../reducers';
import { AppRoute } from '../../const';
import { loginAction } from './login.ts';
import { redirectToRoute, setUserInfoAction } from '../actions';
import * as tokenStorage from '../../services/token.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      offers: initialOffersState,
      auth: authInitialState,
      loading: {},
      cities: initialCitiesState,
      nearbyOffers: initialNearbyOffersState,
      comments: initialCommentState,
      favoriteOffers: initialFavoriteOffersState,
      _persist: {
        version: -1,
        rehydrated: true
      },
    });
  });

  // describe('checkAuthAction', () => {
  //   it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
  //     mockAdapter.onGet(AppRoute.Login).reply(200);
  //
  //     await store.dispatch(checkAuthAction());
  //     const actions = extractActionsTypes(store.getActions());
  //
  //     expect(actions).toEqual([
  //       checkAuthAction.pending.type,
  //       checkAuthAction.fulfilled.type,
  //     ]);
  //   });
  // });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: Auth = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAdapter.onPost(AppRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        setUserInfoAction.type,
        loginAction.fulfilled.type,
        loginAction.rejected.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: Auth = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAdapter.onPost(AppRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(0);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });
});
