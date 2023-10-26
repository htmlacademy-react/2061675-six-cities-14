import React from 'react';
import { Header } from '../../components/header';
import { FavoriteCard } from '../../components/favoriteCard';
import { Footer } from '../../components/footer';

export const Favorites: React.FC = () => (
  <div className="page">
    <Header/>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
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
                <FavoriteCard
                  premium="Premium"
                  imageSrc="img/apartment-small-03.jpg"
                  price={180}
                  ratingStars="100%"
                  placeName="Nice, cozy, warm big bed apartment"
                  placeType="Apartment"
                />
                <FavoriteCard
                  premium=""
                  imageSrc="img/room-small.jpg"
                  price={80}
                  ratingStars="80%"
                  placeName="Wood and stone place"
                  placeType="Room"
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
                <FavoriteCard
                  premium=""
                  imageSrc="img/apartment-small-04.jpg"
                  price={180}
                  ratingStars="100%"
                  placeName="White castle"
                  placeType="Apartment"
                />
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
    <Footer/>
  </div>
);
