import { User } from './user.ts';

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
};

