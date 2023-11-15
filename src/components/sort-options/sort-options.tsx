import React from 'react';

type SortOptionsProps = {
  selectedSortOption: string;
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SortOptions: React.FC<SortOptionsProps> = ({selectedSortOption, onSortChange}) => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <select
        className="places__sorting-type"
        value={selectedSortOption}
        onChange={onSortChange}
      >
        <option value="Popular">Popular</option>
        <option value="PriceLowToHigh">Price: low to high</option>
        <option value="PriceHighToLow">Price: high to low</option>
        <option value="TopRatedFirst">Top rated first</option>
      </select>
    </form>
  );
};
