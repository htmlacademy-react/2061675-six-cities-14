import React from 'react';
import { ReviewsForm } from '../reviewsForm';
import { MockReviews } from '../../mocks';
import { Review } from '../review';

export const ReviewsList: React.FC = () => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">ReviewsForm &middot; <span className="reviews__amount">1</span></h2>
    <ul className="reviews__list">
      {MockReviews.map((review) => (
        <Review review={review} key={review.id}/>
      ))}
    </ul>
    <ReviewsForm/>
  </section>
);
