import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Points } from './mocks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={Points}/>
  </React.StrictMode>
);
