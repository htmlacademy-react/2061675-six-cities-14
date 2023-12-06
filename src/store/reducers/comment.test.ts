import { commentsReducer, CommentsState, initialCommentState } from './comments.ts';
import { StateStatus } from '../../const';
import { fetchCommentsAction } from '../async-actions';
import { Review } from '../../types';
import { makeFakeComment } from '../../utils';
import { addCommentAction } from '../actions';

describe('comments reducer', () => {
  it('should set "Comment" with "fetchCommentsAction.pending" action', () => {
    const expectedState: CommentsState = {
      ...initialCommentState,
      loading: true,
      status: StateStatus.loading,
    };

    const result = commentsReducer(initialCommentState, fetchCommentsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "Comment" with "fetchCommentsAction.fulfilled" action', () => {
    const mockComment: Review = makeFakeComment();
    const expectedState: CommentsState = {
      ...initialCommentState,
      loading: false,
      status: StateStatus.idle,
      comments: [mockComment],
    };

    const result = commentsReducer(initialCommentState, fetchCommentsAction.fulfilled([mockComment], '', {offerId: '1'}));

    expect(result).toEqual(expectedState);
  });

  it('should set "Comment" with "fetchCommentsAction.rejected" action', () => {
    const expectedState: CommentsState = {
      ...initialCommentState,
      loading: false,
      status: StateStatus.idle,
    };

    const result = commentsReducer(initialCommentState, fetchCommentsAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Comment" with "addCommentAction" action', () => {
    const mockComment: Review = makeFakeComment();
    const expectedState: CommentsState = {
      ...initialCommentState,
      comments: [mockComment],
    };

    const result = commentsReducer(initialCommentState, addCommentAction({comments: mockComment}));

    expect(result).toEqual(expectedState);
  });
});
