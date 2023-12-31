import React, { useState } from 'react';
import { OfferType } from '../../types/';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { postFavoriteOfferAction } from '../../store/async-actions';
import { useSelector } from 'react-redux';
import { getAuthorizationStatusSelector } from '../../store/reducers';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getRating } from '../../utils';

export type CardProps = {
  offer: OfferType;
  onCardHover?: (offerId: OfferType['id'] | null) => void;
  className?: string;
  classNameWrapper?: string;
  classNameInfo?: string;
  imgWidth?: string;
  imgHeight?: string;
}

export const Card: React.FC<CardProps> = ({
  offer,
  onCardHover,
  className,
  classNameWrapper,
  classNameInfo,
  imgHeight,
  imgWidth
}) => {
  const dispatch = useAppDispatch();
  const [isBookmarkButtonActive, setBookmarkButtonActive] = useState(offer.isFavorite);
  const authStatus = useSelector(getAuthorizationStatusSelector);
  const navigate = useNavigate();

  function handleMouseEnter() {
    onCardHover?.(offer.id);
  }

  function handleMouseLeave() {
    onCardHover?.(null);
  }

  const handleBookmarkButtonClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    dispatch(postFavoriteOfferAction({offerId: offer.id, status: Number(!isBookmarkButtonActive)}));
    setBookmarkButtonActive((prev) => !prev);
  };

  return (
    <article className={`${className} place-card`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      key={offer.id}
    >
      {offer.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : ''}
      <div className={`${classNameWrapper} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={imgWidth} height={imgHeight}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${classNameInfo} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={isBookmarkButtonActive ? 'place-card__bookmark-button button place-card__bookmark-button--active' : 'place-card__bookmark-button button'}
            type="button"
            onClick={handleBookmarkButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{'width': getRating(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};
