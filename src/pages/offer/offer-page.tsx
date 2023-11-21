import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { useParams } from 'react-router-dom';
import { OfferType } from '../../types';
import { Offer } from '../../components/offer';
import { Map } from '../../components/map';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-dispatch.ts';
import { getSelectedOfferAction } from '../../store/async-actions/get-selected-offer.ts';
import { Loader } from '../../components/loader';
import { getLoadingSelector, getSelectedOfferSelector } from '../../store/reducers';
import { getNearbyOffersSelector } from '../../store/reducers/nearby-offers.ts';
import { getNearbyOffers } from '../../store/async-actions/get-nearby-offers.ts';
import { Card } from '../../components/card';

export const OfferPage: React.FC = () => {
  const {id} = useParams();
  const offer = useSelector(getSelectedOfferSelector);
  const [selectedPoint, setSelectedPoint] = useState<OfferType['id'] | null>(null);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getLoadingSelector);
  const nearbyOffers = useSelector(getNearbyOffersSelector);
  // let city = MockCities.find((c) => c.name === selectedCity.name);
  //
  // if (city === undefined) {
  //   city = MockCities[1];
  // }
  const handleCardHover = (offerId: OfferType['id'] | null) => {
    setSelectedPoint(offerId);
  };

  useEffect(() => {
    if (id) {
      dispatch(getSelectedOfferAction(id));
      dispatch(getNearbyOffers({offerId: id}));
    }
  }, []);
  if (!id) {
    return <div>invalid id</div>;
  }

  return (
    <div className="page">
      <Header/>
      {
        isLoading ? (
          <Loader/>
        ) : (
          offer &&
          <main className="page__main page__main--offer">
            <section className="offer">
              <Offer offer={offer}/>
              <section className="offer__map map">
                <Map city={offer.city} points={nearbyOffers} selectedPoint={selectedPoint}/>
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {nearbyOffers.map((no) => (
                    <Card
                      key={no.id}
                      offer={no}
                      classNameWrapper="near-places__image-wrapper"
                      className="near-places__card"
                      imgHeight="200"
                      imgWidth="260"
                      onCardHover={handleCardHover}
                    />
                  ))}
                </div>
              </section>
            </div>
          </main>
        )
      }
    </div>
  );
};
