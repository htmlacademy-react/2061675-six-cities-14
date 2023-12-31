import { LoadingSlot } from '../const';
import { useSelector } from 'react-redux';
import { loadingStateSelector } from '../store/reducers';

export function useLoadingSlot(slot: LoadingSlot): boolean {
  const state = useSelector(loadingStateSelector);
  return state[slot] || false;
}

export function useLoadingSlots(slots: LoadingSlot[]): boolean {
  const state = useSelector(loadingStateSelector);
  return slots.reduce((prev, currentSlot) => prev || !!state[currentSlot], false);
}
