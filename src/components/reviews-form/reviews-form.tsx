import React, { useState } from 'react';
import { Stars } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postCommentAction } from '../../store/async-actions';

interface ReviewsFormProps {
  offerId: string;
}

export const ReviewsForm: React.FC<ReviewsFormProps> = ({offerId}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    rating: '',
    review: ''
  });

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rating = event.target.value;
    setFormData({...formData, rating: rating});
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const review = event.target.value;
    setFormData((data) => ({...data, review: review}));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(postCommentAction({commentData: {comment: formData.review, rating: Number(formData.rating)}, offerId}));
  };
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Stars.map((star) => (
            <div key={star.id}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={star.value}
                id={star.id}
                type="radio"
                onChange={handleRatingChange}
              />
              <label htmlFor={star.id} className="reviews__rating-label form__rating-label" title={star.title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </div>
          ))
        }
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewChange} value={formData.review}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
};
