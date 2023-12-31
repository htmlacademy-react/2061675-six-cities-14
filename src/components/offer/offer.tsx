import React, { useState } from 'react';
import { ReviewsList } from '../reviews-list';
import { SelectedOffer } from '../../types';
import { getRating } from '../../utils';
import { useSelector } from 'react-redux';
import { getAuthorizationStatusSelector } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { postFavoriteOfferAction } from '../../store/async-actions';
import { useAppDispatch } from '../../hooks';

type OfferProps = {
  offer: SelectedOffer;
}
export const Offer: React.FC<OfferProps> = ({offer}) => {
  const dispatch = useAppDispatch();
  const authStatus = useSelector(getAuthorizationStatusSelector);
  const navigate = useNavigate();
  const [isBookmarkButtonActive, setBookmarkButtonActive] = useState(offer.isFavorite);

  const handleBookmarkButtonClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    dispatch(postFavoriteOfferAction({offerId: offer.id, status: Number(!isBookmarkButtonActive)}));
    setBookmarkButtonActive((prev) => !prev);
  };
  return (
    <>
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer.images.slice(0, 6).map((image) => (
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
            <button
              className={isBookmarkButtonActive ? 'offer__bookmark-button button offer__bookmark-button--active' : 'offer__bookmark-button button'}
              type="button"
              onClick={handleBookmarkButtonClick}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{'width': getRating(offer.rating)}}></span>
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
              <div
                className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}
              >
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
          <ReviewsList/>
        </div>
      </div>
    </>
  );
};
