import React from 'react';
import { CardProps } from '../card';
import { ReviewsForm } from '../reviewsForm';

export const Offer: React.FC<CardProps> = ({offer}) => (
  <section className="offer">
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {offer.images.map((image) => (
          <div className="offer__image-wrapper" key={image}>
            <img className="offer__image" src={image} alt="Photo studio"/>
          </div>
        ))}
      </div>
    </div>
    <div className="offer__container container">
      <div className="offer__wrapper">
        {offer.isPremium ? (
          <div className="offer__mark">
            <span>Premium</span>
          </div>
        ) : ''}
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            {offer.title}
          </h1>
          <button className="offer__bookmark-button button" type="button">
            <svg className="offer__bookmark-icon" width="31" height="33">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="offer__rating rating">
          <div className="offer__stars rating__stars">
            <span style={{'width': offer.rating}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="offer__rating-value rating__value">{offer.rating}</span>
        </div>
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">
            {offer.type}
          </li>
          <li className="offer__feature offer__feature--bedrooms">
            {offer.bedrooms} Bedrooms
          </li>
          <li className="offer__feature offer__feature--adults">
            Max {offer.maxAdults} adults
          </li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">&euro;{offer.price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <ul className="offer__inside-list">
            {offer.goods.map((good) => (
              <li className="offer__inside-item" key={good}>
                {good}
              </li>
            ))}
          </ul>
        </div>
        <div className="offer__host">
          <h2 className="offer__host-title">Meet the host</h2>
          <div className="offer__host-user user">
            <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
              <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                alt="Host avatar"
              />
            </div>
            <span className="offer__user-name">
              {offer.host.name}
            </span>
            {offer.host.isPro ? (
              <span className="offer__user-status">
                    Pro
              </span>
            ) : ''}
          </div>
          <div className="offer__description">
            <p className="offer__text">
              {offer.description}
            </p>
          </div>
        </div>
        <section className="offer__reviews reviews">
          <h2 className="reviews__title">ReviewsForm &middot; <span className="reviews__amount">1</span></h2>
          <ul className="reviews__list">
            <li className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54"
                    alt="ReviewsForm avatar"
                  />
                </div>
                <span className="reviews__user-name">
                        Max
                </span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{'width': '80%'}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
                  The building is green and from 18th century.
                </p>
                <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
              </div>
            </li>
          </ul>
          <ReviewsForm/>
        </section>
      </div>
    </div>
    <section className="offer__map map"></section>
  </section>
);
