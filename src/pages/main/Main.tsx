import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Location } from '../../components/location';
import { MockOffers } from '../../mocks';
import { Empty } from '../../components/empty';
import { OffersList } from '../../components/offersList';

type MainProps = {
  placesCount: number;
}
export const Main: React.FC<MainProps> = ({placesCount}) => {
  const [sortOption, setSortOption] = useState('Popular');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
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
                      <select
                        className="places__sorting-type"
                        value={sortOption}
                        onChange={handleSortChange}
                      >
                        <option value="Popular">Popular</option>
                        <option value="PriceLowToHigh">Price: low to high</option>
                        <option value="PriceHighToLow">Price: high to low</option>
                        <option value="TopRatedFirst">Top rated first</option>
                      </select>
                    </form>
                    <OffersList sortOption={sortOption}/>
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
};
