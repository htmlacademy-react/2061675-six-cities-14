import React from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthorizationStatusSelector } from '../../store/reducers';

type PrivateRouteProps = {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const authorizationStatus = useSelector(getAuthorizationStatusSelector);
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
};
