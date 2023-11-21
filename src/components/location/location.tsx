import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LocationProps = {
  locationName: string;
  active: string;
  onClick: () => void;
}
export const Location: React.FC<LocationProps> = ({locationName, active, onClick}) => (
  <Link to={AppRoute.Main} className={`locations__item-link tabs__item + ${active}`} onClick={onClick}>
    <span>{locationName}</span>
  </Link>
);
