import React from 'react';

type LocationProps = {
  locationName: string;
  active: string;
  onClick: () => void;
}
export const Location: React.FC<LocationProps> = ({locationName, active, onClick}) => (
  <a className={`locations__item-link tabs__item + ${active}`} onClick={onClick}>
    <span>{locationName}</span>
  </a>
);
