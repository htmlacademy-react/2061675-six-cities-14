import { User } from './user.ts';

export type Review = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
};

