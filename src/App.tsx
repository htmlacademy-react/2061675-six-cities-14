import { Main } from './pages/main';
import { AppRoute, AuthorizationStatus } from './const/settings.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Offer } from './pages/offer';
import { Favorites } from './pages/favorites';
import { PrivateRoute } from './components/privateRoute';
import { PlacesCount } from './const/placesCount.ts';
import { Error } from './components/error';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main placesCount={PlacesCount.count}/>}/>
        <Route path={AppRoute.Login} element={<Login/>}/>
        <Route path={AppRoute.Offer} element={<Offer/>}/>
        <Route path={AppRoute.Favorites} element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><Favorites/></PrivateRoute>}></Route>
        <Route path='*' element={<Error />}/>
      </Routes>
    </BrowserRouter>
  );
}
