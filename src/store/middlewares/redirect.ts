import { rootReducer } from '../reducers';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<{
        appRoute: string;
      }>) => {
        if (action.type === 'USER/REDIRECT_TO_ROUTE') {
          browserHistory.push(action.payload.appRoute);
        }

        return next(action);
      };
