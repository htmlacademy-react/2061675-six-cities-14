import React from 'react';
import { Header } from '../../components/header';
import { Location } from '../../components/location';

export const MainEmpty: React.FC = () => (
  <div className="page page--gray page--main">
    <Header/>
    <main className="page__main page__main--index page__main--index-empty">
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
              <Location locationName="Amsterdam" active=""/>
            </li>
            <li className="locations__item">
              <Location locationName="Hamburg" active=""/>
            </li>
            <li className="locations__item">
              <Location locationName="Dusseldorf" active="tabs__item--active"/>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in
                Dusseldorf
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  </div>
);
