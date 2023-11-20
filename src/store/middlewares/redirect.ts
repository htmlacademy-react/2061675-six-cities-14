import { rootReducer } from '../reducers/root-reducer.ts';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'game/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
