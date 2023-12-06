import { Main } from './pages/main';
import { AppRoute } from './const';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { OfferPage } from './pages/offer';
import { Favorites } from './pages/favorites';
import { PrivateRoute } from './components/private-route';
import { Error } from './components/error';
import { HistoryRoute } from './components/history-route';
import browserHistory from './browser-history.ts';


export default function App() {
  return (
    <HistoryRoute history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />}/>
        <Route path={AppRoute.Login} element={<Login/>}/>
        <Route path={AppRoute.Offer} element={<OfferPage />}/>
        <Route path={AppRoute.Favorites} element={<PrivateRoute><Favorites/></PrivateRoute>}></Route>
        <Route path='*' element={<Error />}/>
      </Routes>
    </HistoryRoute>
  );
}
