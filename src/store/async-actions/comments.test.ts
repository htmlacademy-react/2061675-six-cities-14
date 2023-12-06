// import { createAPI } from '../../services';
// import MockAdapter from 'axios-mock-adapter';
// import thunk from 'redux-thunk';
// import { configureMockStore } from '@jedmao/redux-mock-store';
// import { RootState } from '../../types';
// import { Action } from 'redux';
// import { AppThunkDispatch, extractActionsTypes, makeFakeComment } from '../../utils';
// import {
//   authInitialState,
//   initialCitiesState,
//   initialCommentState, initialFavoriteOffersState,
//   initialNearbyOffersState,
//   initialOffersState
// } from '../reducers';
// import { fetchCommentsAction, postCommentAction } from './comments.ts';
// import { postFavoriteOfferAction } from './favorite-offers.ts';
// import { addCommentAction } from '../actions';
//
// describe('Async actions', () => {
//   const axios = createAPI();
//   const mockAxiosAdapter = new MockAdapter(axios);
//   const middleware = [thunk.withExtraArgument(axios)];
//   const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
//   let store: ReturnType<typeof mockStoreCreator>;
//
//   beforeEach(() => {
//     store = mockStoreCreator({
//       offers: initialOffersState,
//       auth: authInitialState,
//       loading: {},
//       cities: initialCitiesState,
//       nearbyOffers: initialNearbyOffersState,
//       comments: initialCommentState,
//       favoriteOffers: initialFavoriteOffersState,
//       _persist: {
//         version: -1,
//         rehydrated: true
//       },
//     });
//   });
//
//   const offerId = 'be7380d9-95b4-4cef-ae28-0ac71e1ebce6';
//
//   describe('fetchCommentsAction', () => {
//     it('Should dispatch "fetchCommentsAction", "fetchComments.fulfilled" when server response 200', async () => {
//       mockAxiosAdapter.onGet(`/six-cities/comments/${offerId}`).reply(200);
//       const expectedActions = [
//         fetchCommentsAction.pending.type,
//         fetchCommentsAction.fulfilled.type,
//         fetchCommentsAction.rejected.type,
//       ];
//
//       await store.dispatch(fetchCommentsAction({offerId: offerId}));
//       const actions = extractActionsTypes(store.getActions());
//
//       expect(actions).toEqual(expectedActions);
//     });
//
//     it('should dispatch "postCommentAction.fulfilled" when server response 200', async () => {
//       const mockComment = makeFakeComment();
//       mockAxiosAdapter.onPost(`/six-cities/comments/${mockComment.id}/1`).reply(200, mockComment);
//
//       await store.dispatch(postCommentAction({offerId: offerId, commentData: {comment: 'ddd', rating: 4}}));
//
//       const emittedActions = store.getActions();
//       const extractedActionsTypes = extractActionsTypes(emittedActions);
//       const fetchActionFulfilled = emittedActions.at(1) as ReturnType<typeof postFavoriteOfferAction.fulfilled>;
//
//       expect(extractedActionsTypes).toEqual([
//         postCommentAction.fulfilled.type,
//         postCommentAction.pending.type,
//         postCommentAction.rejected.type,
//       ]);
//
//       expect(fetchActionFulfilled.payload)
//         .toEqual(mockComment);
//     });
//   });
// });
