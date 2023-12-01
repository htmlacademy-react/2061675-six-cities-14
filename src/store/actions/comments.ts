import { createAction } from '@reduxjs/toolkit';
import { Review } from '../../types';

export const addCommentAction = createAction<{
  comments: Review;
}>('COMMENTS/ADD_COMMENT');

