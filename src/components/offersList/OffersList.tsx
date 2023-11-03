import React from 'react';
import { Card } from '../card';
import { OfferType } from '../../types';

type OffersListProps = {
  // sortOption?: string;
  offers: OfferType[];
  onCardHover?: (offerId: OfferType['id'] | null) => void;
  className?: string;
  classNameWrapper?: string;
}

export const OffersList: React.FC<OffersListProps> = ({ offers, onCardHover, className, classNameWrapper}) => {
  // const getSortedOffers = (): OfferType[] => {
  //   if (sortOption === 'PriceLowToHigh') {
  //     return offers.slice().sort((a: OfferType, b: OfferType) => a.price - b.price);
  //   } else if (sortOption === 'PriceHighToLow') {
  //     return offers.slice().sort((a: OfferType, b: OfferType) => b.price - a.price);
  //   } else if (sortOption === 'TopRatedFirst') {
  //     return offers.slice().sort((a: OfferType, b: OfferType) => b.rating - a.rating);
  //   } else {
  //     return offers;
  //   }
  // };
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card offer={offer} key={offer.id} onCardHover={onCardHover} className={className} classNameWrapper={classNameWrapper} />
      ))}
    </div>
  );
};
