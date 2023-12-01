import { createAction } from '@reduxjs/toolkit';
import { LoadingSlot } from '../../const';


export const clearLoadingAction = createAction('LOADING/CLEAR');
export const setLoadingAction = createAction<{
  slot: LoadingSlot;
  loading: boolean;
}>('LOADING/SET_LOADING');
