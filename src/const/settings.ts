export enum AppRoute {
  Login= '/login',
  Main = '/',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Page404 = '/page404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Main = '/offers',
  Login = '/login',
  Logout = '/logout',
}
