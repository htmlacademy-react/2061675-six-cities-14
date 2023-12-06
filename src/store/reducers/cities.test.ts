import { citiesReducer, CitiesState, initialCitiesState } from './cities.ts';
import { makeFakeCity } from '../../utils';
import { changeCityAction } from '../actions';
import { City } from '../../types';

describe('cities reducer', () => {
  it('should set "Cities" with "changeCityAction" action', () => {
    const mockCity: City = makeFakeCity();
    const expectedState: CitiesState = {
      ...initialCitiesState,
      city: mockCity
    };

    const result = citiesReducer(initialCitiesState, changeCityAction({city: mockCity}));

    expect(result).toEqual(expectedState);
  });
});
