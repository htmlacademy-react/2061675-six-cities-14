import React from 'react';
import { Card } from '../card';
import { OfferType } from '../../types';

type OffersListProps = {
  sortOption: string;
  offers: OfferType[];
  onCardHover?: (offerId: OfferType['id'] | null) => void;
}

export const OffersList: React.FC<OffersListProps> = ({sortOption, offers, onCardHover}) => {
  const getSortedOffers = (): OfferType[] => {
    if (sortOption === 'PriceLowToHigh') {
      return offers.slice().sort((a: OfferType, b: OfferType) => a.price - b.price);
    } else if (sortOption === 'PriceHighToLow') {
      return offers.slice().sort((a: OfferType, b: OfferType) => b.price - a.price);
    } else if (sortOption === 'TopRatedFirst') {
      return offers.slice().sort((a: OfferType, b: OfferType) => b.rating - a.rating);
    } else {
      return offers;
    }
  };
  return (
    <div className="cities__places-list places__list tabs__content">
      {getSortedOffers().map((offer) => (
        <Card offer={offer} key={offer.id} onCardHover={onCardHover} />
      ))}
    </div>
  );
};
