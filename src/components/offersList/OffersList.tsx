import React from 'react';
import { MockOffers } from '../../mocks';
import { Card } from '../card';

export const OffersList: React.FC = () => (
  <div className="cities__places-list places__list tabs__content">
    {MockOffers.map((offer) => (
      <Card offer={offer} key={offer.id}/>
    ))}
  </div>
);
