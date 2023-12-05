import React, { JSX } from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { HistoryRoute } from '../components/history-route';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '../services';
import { RootState } from '../types';
import { Action } from 'redux';
import { AppThunkDispatch } from './mocks.ts';
import { Provider } from 'react-redux';


type WithHistoryProps = {
  component: JSX.Element;
  history?: MemoryHistory;
}

export const withHistory: React.FC<WithHistoryProps> = ({history, component}) => {
  const memoryHistory = history ?? createMemoryHistory();
  return (
    <HistoryRoute history={memoryHistory}>
      {component}
    </HistoryRoute>
  );
};

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<RootState> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
