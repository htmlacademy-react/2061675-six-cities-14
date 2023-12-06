import { makeFakeCity } from '../utils';
import { renderHook } from '@testing-library/react';
import useMap from './use-map.ts';
import { MutableRefObject } from 'react';

describe('Hook: useMap', () => {
  it('Should return "null" if Ref = null', () => {
    const cityInfo = makeFakeCity();
    const mapRef = { current: null };

    const { result } = renderHook(() => useMap(mapRef, cityInfo));

    expect(result.current).toBe(null);
  });

  it('Should return Map-instance if Ref = HTMLElement', () => {
    const cityInfo = makeFakeCity();
    const mapRef = { current: document.createElement('section') } as MutableRefObject<HTMLMapElement | null>;

    const { result } = renderHook(() => useMap(mapRef, cityInfo));

    expect(result.current).not.toBe(null);
    expect(result.current).toBeDefined();
  });
});
