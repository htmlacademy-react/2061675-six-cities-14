import { Review } from '../../types';
import { StateStatus } from '../../const';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { fetchCommentsAction } from '../async-actions';
import { addCommentAction } from '../actions';

export interface CommentsState {
  comments: Review[];
  status: StateStatus;
  loading: boolean;
}

export const initialCommentState: CommentsState = {
  comments: [],
  loading: false,
  status: StateStatus.idle
};

export const commentsReducer = createReducer(initialCommentState, (builder) =>
  builder
    .addCase(fetchCommentsAction.pending, (state) => ({
      ...state,
      loading: true,
      status: StateStatus.loading,
    }))
    .addCase(fetchCommentsAction.fulfilled, (state, {payload}) => ({
      ...state,
      comments: payload,
      status: StateStatus.idle,
      loading: false,
    }))
    .addCase(fetchCommentsAction.rejected, (state, {payload}) => {
      if (payload) {
        return {
          ...state,
          error: payload,
        };
      }
      return {
        ...state,
        status: StateStatus.idle,
        loading: false
      };
    })
    .addCase(addCommentAction, (state, {payload}) => {
      state.comments.unshift(payload.comments);
    })
);

type WithCommentsState = {
  comments: CommentsState;
}

export const commentsStateSelector = (
  state: WithCommentsState,
): CommentsState => state.comments;

export const getCommentsSelector = createSelector(
  commentsStateSelector,
  (state) => {
    const comments = [...state.comments];
    return comments.sort((a, b) => {
      // @ts-ignore
      return new Date(b.date) - new Date(a.date);
    });
  });

export const getCommentsLoadingSelector = createSelector(
  commentsStateSelector,
  (state) => state.loading
);


