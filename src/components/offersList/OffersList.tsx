import React from 'react';
import { MockOffers } from '../../mocks';
import { Card } from '../card';
import { Offer } from '../../types/offer.ts';

export const OffersList: React.FC<{ sortOption: string }> = ({sortOption}) => {
  const getSortedOffers = (): Offer[] => {
    switch (sortOption) {
      case 'PriceLowToHigh':
        return MockOffers.slice().sort((a, b) => a.price - b.price);
      case 'PriceHighToLow':
        return MockOffers.slice().sort((a, b) => b.price - a.price);
      case 'TopRatedFirst':
        return MockOffers.slice().sort((a, b) => b.rating - a.rating);
      default:
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
