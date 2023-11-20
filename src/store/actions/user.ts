import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../../const/settings.ts';

export const requireAuthorization = createAction<{
  authorizationStatus: AuthorizationStatus;
}>('USER/REQUIRE_AUTHORIZATION');

export const redirectToRoute = createAction<{
  appRoute: AppRoute;
}>('CITIES/REDIRECT_TO_ROUTE');
