import React, { useState } from 'react';
import { Header } from '../../components/header';
import { useParams } from 'react-router-dom';
import { OfferType } from '../../types';
import { Offer } from '../../components/offer';
import { MockCities, MockNearby } from '../../mocks';
import { OffersList } from '../../components/offers-list';
import { Map } from '../../components/map';
import { useSelector } from 'react-redux';
import { getSelectedCitySelector } from '../../store/reducer.ts';

type OfferProps = {
  offers: OfferType[];
}
export const OfferPage: React.FC<OfferProps> = ({offers}) => {
  const {id} = useParams();
  const offer = offers.find((o) => o.id === Number(id));
  const [selectedPoint, setSelectedPoint] = useState<OfferType['id'] | null>(null);

  const selectedCity = useSelector(getSelectedCitySelector);
  let city = MockCities.find((c) => c.name === selectedCity.name);

  if (city === undefined) {
    city = MockCities[1];
  }
  const handleCardHover = (offerId: OfferType['id'] | null) => {
    setSelectedPoint(offerId);
  };

  return (
    <div className="page">
      <Header/>
      {offer &&
        <main className="page__main page__main--offer">
          <section className="offer">
            <Offer offer={offer} />
            <section className="offer__map map">
              <Map city={city} points={MockNearby} selectedPoint={selectedPoint} />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OffersList
                  offers={MockNearby}
                  classNameWrapper="near-places__image-wrapper"
                  className="near-places__card"
                  imgHeight="200"
                  imgWidth="260"
                  onCardHover={handleCardHover}
                />
              </div>
            </section>
          </div>
        </main>}
    </div>
  );
};
