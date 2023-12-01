import React, { useState } from 'react';
import { SortItems } from '../../const';

type SortOptionsProps = {
  selectedSortOption: string;
  onSortChange: (sortingOption: string) => void;
};

export const SortOptions: React.FC<SortOptionsProps> = ({onSortChange, selectedSortOption}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(SortItems.Popular);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const updateSorting = (option: string) => {
    setSelectedOption(option);
    onSortChange(option);
    handleToggle();
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleToggle}>
        {selectedOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortItems).map((item) => (
          <li
            value={selectedSortOption}
            key={item}
            className={`places__option ${selectedOption === item ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => updateSorting(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
};
