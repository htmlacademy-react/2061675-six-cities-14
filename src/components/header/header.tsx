import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { useSelector } from 'react-redux';
import { getAuthorizationStatusSelector, getUserInfoSelector } from '../../store/reducers';
import { fetchFavoriteOffersAction, logoutAction } from '../../store/async-actions';
import { getFavoriteOffersNumberStateSelector } from '../../store/reducers/favorite-offers.ts';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const authStatus = useSelector(getAuthorizationStatusSelector);
  const loggedUser = (authStatus === AuthorizationStatus.Auth);
  const userInfo = useSelector(getUserInfoSelector);
  const favoriteOffersNumber = useSelector(getFavoriteOffersNumberStateSelector);
  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                loggedUser ? (
                  <>
                    <li className="header__nav-item user">
                      <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{userInfo ? userInfo.email : ''}</span>
                        <span className="header__favorite-count">{favoriteOffersNumber}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to={AppRoute.Login}>
                        <span className="header__signout" onClick={handleLogoutClick}>Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
