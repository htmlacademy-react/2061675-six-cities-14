import React from 'react';
import { CardProps } from '../card';

export const FavoriteCard: React.FC<CardProps> = ({ratingStars, placeType, placeName, price, imageSrc, premium}) => (
  <article className="favorites__card place-card">
    <div className="place-card__mark">
      <span>{premium}</span>
    </div>
    <div className="favorites__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={imageSrc} width="150" height="110" alt="Place image"/>
      </a>
    </div>
    <div className="favorites__card-info place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{'width': ratingStars}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{placeName}</a>
      </h2>
      <p className="place-card__type">{placeType}</p>
    </div>
  </article>
);
