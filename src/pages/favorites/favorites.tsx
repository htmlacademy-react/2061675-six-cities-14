import React from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { MockOffers } from '../../mocks';
import { FavoriteEmpty } from '../../components/favorite-empty';
import { OffersList } from '../../components/offers-list';

export const Favorites: React.FC = () => (
  <div className="page">
    <Header/>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {
          MockOffers.length ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OffersList
                      className="favorites__card"
                      classNameWrapper="favorites__image-wrapper"
                      offers={MockOffers}
                      classNameInfo="favorites__card-info"
                      imgWidth="150"
                      imgHeight="110"
                    />
                  </div>
                </li>

                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OffersList
                      className="favorites__card"
                      classNameWrapper="favorites__image-wrapper"
                      offers={MockOffers}
                      classNameInfo="favorites__card-info"
                      imgWidth="150"
                      imgHeight="110"
                    />
                  </div>
                </li>
              </ul>
            </section>
          ) : <FavoriteEmpty/>
        }
      </div>
    </main>
    <Footer/>
  </div>
);
