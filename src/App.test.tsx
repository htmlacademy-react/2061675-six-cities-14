import { createMemoryHistory, MemoryHistory } from 'history';
import { makeFakeStore, withHistory, withStore } from './utils';
import App from './App.tsx';
import { AppRoute } from './const';
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
});
