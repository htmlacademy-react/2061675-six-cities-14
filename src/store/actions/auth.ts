import { AppRoute, AuthorizationStatus } from '../../const';
import { createAction } from '@reduxjs/toolkit';
import { UserAuthData } from '../../types';

export const requireAuthorization = createAction<{
  authorizationStatus: AuthorizationStatus;
}>('USER/REQUIRE_AUTHORIZATION');

export const redirectToRoute = createAction<{
  appRoute: AppRoute;
}>('USER/REDIRECT_TO_ROUTE');

export const setUserInfoAction = createAction<{
  userInfo: UserAuthData | null;
}>('USER/SET_USER_DATA');
