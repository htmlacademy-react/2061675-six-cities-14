import { ThunkDispatch } from 'redux-thunk';
import { City, Location, OfferType, Review, RootState, SelectedOffer, User, UserAuthData } from '../types';
import { createAPI } from '../services';
import { Action } from 'redux';
import { datatype, date, image, internet, lorem, name } from 'faker';
import { AppRoute, AuthorizationStatus, StateStatus } from '../const';

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;

export const makeFakeUserInfo = (): UserAuthData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.uuid(),
} as UserAuthData);
export const makeFakeLocation = (): Location => ({
  latitude: datatype.number({min: -90, max: 90, precision: 0.000001}),
  longitude: datatype.number({min: -180, max: 180, precision: 0.000001}),
  zoom: datatype.number({min: 1, max: 17}),
} as Location);

export const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: name.firstName(),
} as City);

export const makeFakeHost = (): User => ({
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
  name: name.firstName(),
} as User);

export const makeFakeSelectedOffer = (): SelectedOffer => ({
  bedrooms: datatype.number({min: 1, max: 10}),
  city: makeFakeCity(),
  description: lorem.lines(1),
  goods: datatype.array(5),
  host: makeFakeHost(),
  id: lorem.lines(1),
  images: [
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
  ],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: datatype.number({min: 1, max: 10}),
  previewImage: image.imageUrl(500, 500),
  price: datatype.number({min: 1, max: 999}),
  rating: datatype.number({min: 1, max: 5, precision: 0.1}),
  title: lorem.lines(1),
  type: lorem.word(),
} as SelectedOffer);

export const makeFakeOffer = (): OfferType => ({
  id: lorem.lines(1),
  city: makeFakeCity(),
  previewImage: image.imageUrl(500, 500),
  images: [
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
  ],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  price: datatype.number({min: 1, max: 999}),
  rating: datatype.number({min: 1, max: 5, precision: 0.1}),
  title: lorem.lines(1),
  type: lorem.word(),
  description: lorem.lines(1),
} as OfferType);

export const makeFakeComment = (): Review => ({
  comment: lorem.paragraph(),
  date: new Date(date.recent()).toLocaleString(),
  id: lorem.lines(1),
  rating: datatype.number({min: 1, max: 5, precision: 0.1}),
  user: makeFakeHost(),
} as Review);

export const makeFakeStore = (initialState?: Partial<RootState>): RootState => ({
  cities: {
    city: makeFakeCity(),
    loading: false,
    status: StateStatus.idle,
  },
  offers: {
    offers: [makeFakeOffer()],
    selectedOffer: makeFakeSelectedOffer(),
    loading: false,
    status: StateStatus.idle
  },
  loading: {},
  auth: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: makeFakeUserInfo(),
    redirectTo: AppRoute.Login,
    loading: false,
    status: StateStatus.idle
  },
  nearbyOffers: {
    nearbyOffers: [makeFakeOffer()],
    loading: false,
    status: StateStatus.idle,
  },
  comments: {
    comments: [makeFakeComment()],
    loading: false,
    status: StateStatus.idle,
  },
  favoriteOffers: {
    favoriteOffers: [makeFakeSelectedOffer()],
    loading: false,
    status: StateStatus.idle,
  },
  _persist: {
    version: -1,
    rehydrated: true
  },
  ...initialState ?? {},
});
