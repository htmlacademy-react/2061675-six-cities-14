import { AppRoute, AuthorizationStatus } from '../../const/settings.ts';
import { createAction } from '@reduxjs/toolkit';

export const requireAuthorization = createAction<{
  authorizationStatus: AuthorizationStatus;
}>('USER/REQUIRE_AUTHORIZATION');

export const redirectToRoute = createAction<{
  appRoute: typeof AppRoute;
}>('CITIES/REDIRECT_TO_ROUTE');
