import { setMockBrowserHistory } from '../../utils';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect.ts';
import { RootState } from '../../types';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history.ts';
import { redirectToRoute } from '../actions';
import { AppRoute } from '../../const';

setMockBrowserHistory();

describe('[Middleware Redirect]:', () => {
  let mockStore: MockStore;

  beforeAll(() => {
    const middleware = [ redirect ];
    const mockStoreCreator = configureMockStore<RootState, AnyAction>(middleware);
    mockStore = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('Should redirect to Page-404 when "redirectToRoute(AppRoute.PAGE_404)" action', () => {
    const redirectAction = redirectToRoute({appRoute: AppRoute.Page404});

    mockStore.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoute.Page404);
  });

  it('Should redirect to "Main" when "redirectToRoute(AppRoute.MAIN)" action', () => {
    const redirectAction = redirectToRoute({appRoute: AppRoute.Main});

    mockStore.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoute.Main);
  });

  it('Should not redirect to "Login" page route when passed empty type', () => {
    const emptyAction = { type: '', payload: AppRoute.Login };

    mockStore.dispatch(emptyAction);

    expect(browserHistory.location.pathname).not.toBe(AppRoute.Login);
  });

  it('Should not redirect to any route when passed empty action', () => {
    const emptyAction = { type: '', payload: '' };

    mockStore.dispatch(emptyAction);

    expect(browserHistory.location.pathname).toBe('');
  });
});
