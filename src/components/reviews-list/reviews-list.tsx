import React, { useEffect } from 'react';
import { ReviewsForm } from '../reviews-form';
import { Review } from '../review';
import { useAppDispatch } from '../../hooks';
import { useSelector } from 'react-redux';
import { getCommentsSelector } from '../../store/reducers';
import { fetchCommentsAction } from '../../store/async-actions';
import { useParams } from 'react-router-dom';

export const ReviewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const comments = useSelector(getCommentsSelector);
  const {id} = useParams();
  useEffect(() => {
    if(id) {
      dispatch(fetchCommentsAction({offerId: id}));
    }
  }, []);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">ReviewsForm &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        {comments.map((review) => (
          <Review review={review} key={review.id}/>
        ))}
      </ul>
      {
        id && <ReviewsForm offerId={id}/>
      }
    </section>
  );
};
