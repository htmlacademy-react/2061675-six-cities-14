import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { withHistory } from '../../utils';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route.tsx';
import { render, screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      {
        component:
          <Routes>
            <Route path={AppRoute.Login} element={<span>{expectedText}</span>}/>
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute>
                <span>{notExpectedText}</span>
              </PrivateRoute>
            }
            />
          </Routes>,
        history: mockHistory
      }
    );
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      {
        component:
          <Routes>
            <Route path={AppRoute.Login} element={<span>{expectedText}</span>}/>
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute>
                <span>{notExpectedText}</span>
              </PrivateRoute>
            }
            />
          </Routes>,
        history: mockHistory
      }
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
