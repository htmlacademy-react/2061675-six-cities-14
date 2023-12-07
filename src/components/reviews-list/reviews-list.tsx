import React, { useEffect } from 'react';
import { ReviewsForm } from '../reviews-form';
import { Review } from '../review';
import { useAppDispatch } from '../../hooks';
import { useSelector } from 'react-redux';
import { getAuthorizationStatusSelector, getCommentsLoadingSelector, getCommentsSelector } from '../../store/reducers';
import { fetchCommentsAction } from '../../store/async-actions';
import { useParams } from 'react-router-dom';
import { Loader } from '../loader';
import { AuthorizationStatus } from '../../const';

export const ReviewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const comments = useSelector(getCommentsSelector);
  const {id} = useParams();
  const isLoading = useSelector(getCommentsLoadingSelector);
  const authStatus = useSelector(getAuthorizationStatusSelector);
  const loggedUser = (authStatus === AuthorizationStatus.Auth);
  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsAction({offerId: id}));
    }
  }, []);

  const slicedComments = (comments.length >= 10)
    ? comments.slice(0, 10)
    : comments;

  return (
    <>
      {
        isLoading ? <Loader/> : (
          <section className="offer__reviews reviews">
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
            <ul className="reviews__list">
              {slicedComments.map((review) => (
                <Review review={review} key={review.id}/>
              ))}
            </ul>
            {
              loggedUser ? (
                id && <ReviewsForm offerId={id}/>
              ) : ''
            }
          </section>
        )
      }
    </>
  );
};
