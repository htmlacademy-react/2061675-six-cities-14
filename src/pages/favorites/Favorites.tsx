import React from 'react';
import { Header } from '../../components/header';
import { FavoriteCard } from '../../components/favoriteCard';
import { Footer } from '../../components/footer';
import { MockOffers } from '../../mocks';
import { FavoriteEmpty } from '../../components/favoriteEmpty';

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
                    {MockOffers.map((offer) => (
                      <FavoriteCard offer={offer} key={offer.id}/>
                    ))}
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
                    {MockOffers.map((offer) => (
                      <FavoriteCard offer={offer} key={offer.id}/>
                    ))}
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
