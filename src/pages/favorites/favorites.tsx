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
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favoriteOffers.length ? (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    favoriteOffers.map((fo) => (
                      <li className="favorites__locations-items" key={fo.id}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{fo.city.name}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          <Card
                            className="favorites__card"
                            classNameWrapper="favorites__image-wrapper"
                            offer={fo}
                            classNameInfo="favorites__card-info"
                            imgWidth="150"
                            imgHeight="110"
                          />
                        </div>
                      </li>
                    ))
                  }
                  {/*<li className="favorites__locations-items">*/}
                  {/*  <div className="favorites__locations locations locations--current">*/}
                  {/*    <div className="locations__item">*/}
                  {/*      <a className="locations__item-link" href="#">*/}
                  {/*        <span>Amsterdam</span>*/}
                  {/*      </a>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*  <div className="favorites__places">*/}
                  {/*    <OffersList*/}
                  {/*      className="favorites__card"*/}
                  {/*      classNameWrapper="favorites__image-wrapper"*/}
                  {/*      offers={favoriteOffers}*/}
                  {/*      classNameInfo="favorites__card-info"*/}
                  {/*      imgWidth="150"*/}
                  {/*      imgHeight="110"*/}
                  {/*    />*/}
                  {/*  </div>*/}
                  {/*</li>*/}
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
