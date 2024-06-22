import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

import searchSvg from '@/assets/icons/search.svg?url';

import styles from './styles.module.scss';
import { ElasticSearchProps, Option } from './types';

export const ElasticSearch = ({
  options,
  label,
  selectedVal,
  handleChange,
}: ElasticSearchProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo((): Option[] => {
    return options.filter((option: Option) =>
      option[label].toString().toLowerCase().includes(query.toLowerCase())
    );
  }, [label, options, query]);

  const selectOption = (option: Option): void => {
    setQuery(() => '');
    handleChange(option[label].toString());
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleDropdownVisibility = (e: MouseEvent) => {
    setIsOpen(e && e.target === inputRef.current);
  };

  const onInputClick = () => {
    setIsOpen(true);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return '';
  };

  const onOptionClick = (option: Option) => () => {
    selectOption(option);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleChange(null);
  };

  useEffect(() => {
    document.addEventListener('click', toggleDropdownVisibility);
    return () => document.removeEventListener('click', toggleDropdownVisibility);
  }, []);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <input
          onClick={onInputClick}
          ref={inputRef}
          value={getDisplayValue()}
          type="text"
          placeholder="Select currency..."
          onChange={onInputChange}
        />
        <div className={styles.searchInputIconContainer}>
          <img title="search currency" src={searchSvg} alt="search" />
        </div>
      </div>
      {isOpen && (
        <div className={styles.dataResult}>
          {filteredOptions.map((option: Option) => (
            <option
              onClick={onOptionClick(option)}
              tabIndex={0}
              role="button"
              key={option.id}
              className={styles.dataItem}
            >
              {option[label]}
            </option>
          ))}
        </div>
      )}
    </div>
  );
};
