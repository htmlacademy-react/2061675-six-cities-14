import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction } from './store/async-actions';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import browserHistory from './browser-history.ts';
import { HistoryRoute } from './components/history-route';

store.dispatch(checkAuthAction());
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HistoryRoute history={browserHistory}>
          <App/>
        </HistoryRoute>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
