import { BrowserHistory } from 'history';
import React, { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

export interface HistoryRouteProps {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}

export const HistoryRoute: React.FC<HistoryRouteProps> = ({history, children, basename}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    >
      {children}
    </Router>
  );
};
