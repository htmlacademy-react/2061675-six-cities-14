import React, { useEffect } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { FavoriteEmpty } from '../../components/favorite-empty';
import { useAppDispatch } from '../../hooks';
import { useSelector } from 'react-redux';
import { getFavoriteOffersStateSelector } from '../../store/reducers/favorite-offers.ts';
import { fetchFavoriteOffersAction } from '../../store/async-actions';
import { Card } from '../../components/card';

export const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const favoriteOffers = useSelector(getFavoriteOffersStateSelector);
  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, []);
  return (
    <div className={`page ${!favoriteOffers.length ? 'page--favorites-empty' : ''}`}>
      <Header/>
      <main className={`page__main page__main--favorites ${favoriteOffers.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="visually-hidden">Favorites offers</div>
        <div className="page__favorites-container container">
          {
            favoriteOffers.length ? (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    Array.from(new Set(favoriteOffers.map((fo) => fo.city.name))).map((cityName) => {
                      const cityOffers = favoriteOffers.filter((fo) => fo.city.name === cityName);

                      return (
                        <li className="favorites__locations-items" key={cityOffers[0].id}>
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <a className="locations__item-link" href="#">
                                <span>{cityName}</span>
                              </a>
                            </div>
                          </div>
                          <div className="favorites__places">
                            {cityOffers.map((fo) => (
                              <Card
                                className="favorites__card"
                                classNameWrapper="favorites__image-wrapper"
                                offer={fo}
                                classNameInfo="favorites__card-info"
                                imgWidth="150"
                                imgHeight="110"
                                key={fo.id}
                              />
                            ))}
                          </div>
                        </li>
                      );
                    })
                  }
                </ul>
              </section>
            ) : <FavoriteEmpty/>
          }
        </div>
      </main>
      <Footer/>
    </div>
  );
};
