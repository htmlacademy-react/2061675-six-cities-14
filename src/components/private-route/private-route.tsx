import React from 'react';
import { AppRoute } from '../../const';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../services';

type PrivateRouteProps = {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const token = getToken();
  return (
    token
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
};
