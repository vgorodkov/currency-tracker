/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react';

import searchSvg from '@/assets/icons/search.svg?url';

import styles from './styles.module.scss';

interface Option {
  id: number;
  name: string;
}

interface ElasticSearchProps {
  label: keyof Option;
  selectedVal: string;
  handleChange: (val: string) => void;
  options: Option[];
}

export const ElasticSearch = ({
  options,
  label,
  selectedVal,
  handleChange,
}: ElasticSearchProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectOption = (option: Option): void => {
    setQuery(() => '');
    handleChange(option[label].toString());
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggle = (e: MouseEvent) => {
    setIsOpen(e && e.target === inputRef.current);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return '';
  };

  const filterOptions = (): Option[] => {
    return options.filter((option) =>
      option[label].toString().toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <input
          onClick={toggle}
          ref={inputRef}
          value={getDisplayValue()}
          type="text"
          placeholder="Select currency..."
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
          }}
        />
        <div className={styles.searchInputIconContainer}>
          <img src={searchSvg} alt="search" />
        </div>
      </div>
      {isOpen && (
        <div className={styles.dataResult}>
          {filterOptions().map((option) => (
            <div
              tabIndex={0}
              role="button"
              key={option.id}
              onClick={() => selectOption(option)}
              className={styles.dataItem}
            >
              {option[label]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
