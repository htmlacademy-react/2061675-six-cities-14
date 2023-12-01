import { createReducer } from '@reduxjs/toolkit';
import { LoadingSlot } from '../../const';
import { clearLoadingAction, setLoadingAction } from '../actions';

type LoadingState = {
  [slot in keyof Partial<typeof LoadingSlot>]: boolean;
};

const initialLoadingState: LoadingState = {};

export const loadingReducer = createReducer(initialLoadingState, (builder) =>
  builder
    .addCase(clearLoadingAction, () => initialLoadingState)
    .addCase(setLoadingAction, (state, { payload }) => ({
      ...state,
      [payload.slot]: payload.loading,
    }))
);

type WithLoadingState = {
  loading: LoadingState;
};

export const loadingStateSelector = (state: WithLoadingState): LoadingState =>
  state.loading;
