import { createMemoryHistory, MemoryHistory } from 'history';
import { makeFakeStore, makeFakeUserInfo, withHistory, withStore } from './utils';
import App from './App.tsx';
import { AppRoute, AuthorizationStatus, StateStatus } from './const';
import { render, screen } from '@testing-library/react';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory({component: <App/>, history: mockHistory}) as JSX.Element;
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);
    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory({component: <App/>, history: mockHistory}) as JSX.Element;
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
  });

  it('should render Favorites page when user navigate to "/favorite"', () => {
    const withHistoryComponent = withHistory({component: <App/>, history: mockHistory}) as JSX.Element;
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        status: StateStatus.idle,
        userInfo: makeFakeUserInfo(),
        loading: false,
        redirectTo: AppRoute.Favorites
      }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText('Favorites offers')).toBeInTheDocument();
  });

  it('should render Offer page when user navigate to "/offer/1"', () => {
    const withHistoryComponent = withHistory({component: <App/>, history: mockHistory}) as JSX.Element;
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUserInfo(),
        redirectTo: AppRoute.Offer,
        loading: false,
        status: StateStatus.idle
      }
    }));
    mockHistory.push(`${AppRoute.Offer}1`);

    render(withStoreComponent);

    expect(screen.getByText('Offer info')).toBeInTheDocument();
  });

  it('should render Error page when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory({component: <App/>, history: mockHistory}) as JSX.Element;
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
