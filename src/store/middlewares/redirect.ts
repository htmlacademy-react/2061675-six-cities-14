import { rootReducer } from '../reducers/root-reducer.ts';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'USER/REDIRECT_TO_ROUTE') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
