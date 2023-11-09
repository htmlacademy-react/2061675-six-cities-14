import React from 'react';
import { MockOffers } from '../../mocks';
import { Card } from '../card';
import { OfferType } from '../../types/offer.ts';

export const OffersList: React.FC<{ sortOption: string }> = ({sortOption}) => {
  const getSortedOffers = (): OfferType[] => {
    if (sortOption === 'PriceLowToHigh') {
      return MockOffers.slice().sort((a: OfferType, b: OfferType) => a.price - b.price);
    } else if (sortOption === 'PriceHighToLow') {
      return MockOffers.slice().sort((a: OfferType, b: OfferType) => b.price - a.price);
    } else if (sortOption === 'TopRatedFirst') {
      return MockOffers.slice().sort((a: OfferType, b: OfferType) => b.rating - a.rating);
    } else {
      return MockOffers;
    }
  };
  return (
    <div className="cities__places-list places__list tabs__content">
      {getSortedOffers().map((offer) => (
        <Card offer={offer} key={offer.id} />
      ))}
    </div>
  );
};
