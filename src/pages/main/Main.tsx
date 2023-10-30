import React from 'react';
import { Header } from '../../components/header';
import { Location } from '../../components/location';
import { MockOffers } from '../../mocks';
import { Empty } from '../../components/empty';
import { OffersList } from '../../components/offersList';

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
          {
            MockOffers.length ?
              <>
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
                  <OffersList/>
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map"></section>
                </div>
              </> : <Empty/>
          }
        </div>
      </div>
    </main>
  </div>
);
