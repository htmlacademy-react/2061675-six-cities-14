import React from 'react';
import { AppRoute, AuthorizationStatus } from '../../const/settings.ts';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({authorizationStatus, children}) => (
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />
);
