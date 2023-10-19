import React from 'react';

type LocationProps = {
  locationName: string;
  active: string;
}
export const Location: React.FC<LocationProps> = ({locationName, active}) => {
  return (
    <a className={`locations__item-link tabs__item + ${active}`} href="#">
      <span>{locationName}</span>
    </a>
  );
};
