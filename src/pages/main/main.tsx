import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { Location } from '../../components/location';
import { Empty } from '../../components/empty';
import { OffersList } from '../../components/offers-list';
import { OfferType } from '../../types';
import { Map } from '../../components/map';
import { useAppDispatch } from '../../hooks';
import { useSelector } from 'react-redux';
import { SortOptions } from '../../components/sort-options';
import { fetchOffersAction } from '../../store/async-actions';
import { Loader } from '../../components/loader';
import {
  getCitiesSelector,
  getLoadingSelector,
  getOffersSelector,
  getSelectedCitySelector
} from '../../store/reducers';
import { changeCityAction } from '../../store/actions';
import { DefaultCities, SortItems } from '../../const';
import { capitalizeFirstLetter } from '../../utils';
import { useSearchParams } from 'react-router-dom';

export const Main: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>(SortItems.Popular);
  const [selectedPoint, setSelectedPoint] = useState<OfferType['id'] | null>(null);

  const dispatch = useAppDispatch();
  const citiesSet = useSelector(getCitiesSelector);
  const selectedCity = useSelector(getSelectedCitySelector);
  const offers = useSelector(getOffersSelector);
  let city = citiesSet.find((c) => c.name === selectedCity?.name);
  const isLoading = useSelector(getLoadingSelector);

  const [searchParams] = useSearchParams();

  if (city === undefined) {
    city = citiesSet[0];
  }
  const offersInSelectedCity = offers.filter((offer) => offer.city.name === selectedCity?.name);

  const handleCardHover = (offerId: OfferType['id'] | null) => {
    setSelectedPoint(offerId);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  useEffect(() => {
    const defaultCityName = searchParams.get('city') ?? 'Paris';
    const defaultCity = DefaultCities.find((c) => c.name === defaultCityName);
    if (defaultCity) {
      dispatch(changeCityAction({
        city: defaultCity
      }));
    }
    dispatch(fetchOffersAction());
  }, []);
  return (
    <div className="page page--gray page--main">
      <Header/>
      <main
        className={`page__main page__main--index ${offersInSelectedCity.length ? '' : 'page__main--index-empty'}`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {citiesSet.map((c) => (
                <li key={c.name} className="locations__item">
                  <Location
                    locationName={capitalizeFirstLetter(c.name)}
                    active={`${selectedCity?.name === c.name ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}`}
                    onClick={() => dispatch(changeCityAction({city: c}))}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
        {
          isLoading ? (
            <Loader/>
          ) : (
            <div className="cities">
              {
                offersInSelectedCity.length ?
                  <div className="cities__places-container container">
                    <section className="cities__places places">
                      <h2 className="visually-hidden">Places</h2>
                      <b className="places__found">{`${offersInSelectedCity.length} places to stay in ${selectedCity?.name}`}</b>
                      <SortOptions selectedSortOption={sortOption} onSortChange={handleSortChange}/>
                      <div className="cities__places-list places__list tabs__content">
                        <OffersList
                          offers={offersInSelectedCity}
                          onCardHover={handleCardHover}
                          className="cities__card"
                          classNameWrapper="cities__image-wrapper"
                          imgWidth="260"
                          imgHeight="200"
                          sortOption={sortOption}
                        />
                      </div>
                    </section>
                    <div className="cities__right-section">
                      <section className="cities__map map">
                        <Map points={offers} selectedPoint={selectedPoint} city={city}/>
                      </section>
                    </div>
                  </div>
                  :
                  <Empty city={`${selectedCity?.name}` || ''}/>
              }
            </div>
          )
        }
      </main>
    </div>
  );
};
