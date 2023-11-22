import { createAction } from '@reduxjs/toolkit';
import { Review } from '../../types';

export const getCommentsAction = createAction<{
  comments: Review[];
}>('COMMENTS/GET_COMMENTS');
