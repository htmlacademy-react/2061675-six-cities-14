import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../types';
import { createAPI } from '../services';
import { Action } from 'redux';

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;
