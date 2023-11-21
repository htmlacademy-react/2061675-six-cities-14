import React from 'react';
import { AppRoute, AuthorizationStatus } from '../../const/settings.ts';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children, authorizationStatus}) =>
  (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
