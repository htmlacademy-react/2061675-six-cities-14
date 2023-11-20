import { AuthorizationStatus } from '../const/settings.js';

export const checkAuthorizationStatus = () => {
  const token = localStorage.getItem('token');
  return token ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth;
};
