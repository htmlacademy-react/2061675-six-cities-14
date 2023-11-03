import React from 'react';
import { Header } from '../../components/header';
import { useParams } from 'react-router-dom';
import { OfferType } from '../../types';
import { Offer } from '../../components/offer';
import { MockCity, MockNearby } from '../../mocks';
import { OffersList } from '../../components/offersList';

type OfferProps = {
  offers: OfferType[];
}
export const OfferPage: React.FC<OfferProps> = ({offers}) => {
  const {id} = useParams();
  const offer = offers.find((o) => o.id === Number(id));
  return (
    <div className="page">
      <Header/>
      {offer &&
        <main className="page__main page__main--offer">
          <Offer offer={offer} points={MockNearby} city={MockCity} />
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OffersList offers={MockNearby} classNameWrapper='near-places__image-wrapper' className='near-places__card' />
              </div>
            </section>
          </div>
        </main>}
    </div>
  );
};
