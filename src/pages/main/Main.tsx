import React from 'react';
import { Header } from '../../components/header';
import { Card } from '../../components/card';
import { Location } from '../../components/location';

type MainProps = {
  placesCount: number;
}
export const Main: React.FC<MainProps> = ({placesCount}) => (
  <div className="page page--gray page--main">
    <Header/>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <Location locationName="Paris" active=""/>
            </li>
            <li className="locations__item">
              <Location locationName="Cologne" active=""/>
            </li>
            <li className="locations__item">
              <Location locationName="Brussels" active=""/>
            </li>
            <li className="locations__item">
              <Location locationName="Amsterdam" active="tabs__item--active"/>
            </li>
            <li className="locations__item">
              <Location locationName="Hamburg" active=""/>
            </li>
            <li className="locations__item">
              <Location locationName="Dusseldorf" active=""/>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placesCount} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                  Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <Card
                premium="Premium"
                imageSrc="img/apartment-01.jpg"
                price={120}
                placeName="Beautiful &amp; luxurious apartment at great location"
                placeType="Apartment"
                ratingStars="80%"
              />
              <Card
                premium=""
                imageSrc="img/room.jpg"
                price={80}
                placeName="Wood and stone place"
                placeType="Room"
                ratingStars="80%"
              />
              <Card
                premium=""
                imageSrc="img/apartment-02.jpg"
                price={132}
                placeName="Canal View Prinsengracht"
                placeType="Apartment"
                ratingStars="80%"
              />
              <Card
                premium="Premium"
                imageSrc="img/apartment-03.jpg"
                price={180}
                placeName="Nice, cozy, warm big bed apartment"
                placeType="Apartment"
                ratingStars="100%"
              />
              <Card
                premium=""
                imageSrc="img/room.jpg"
                price={80}
                placeName="Wood and stone place"
                placeType="Room"
                ratingStars="80%"
              />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  </div>
);
