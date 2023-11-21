import { rootReducer } from '../reducers/root-reducer.ts';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history.ts';
import { AppRoute } from '../../const/settings.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'route/redirect') {
          browserHistory.push(AppRoute.Page404);
        }

        return next(action);
      };
