/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import Arrow from '@/assets/icons/chevron_down.svg';

import styles from './styles.module.scss';

interface DropdownProps {
  selected: string;
  handleSelect: (toCurrency: string) => void;
  options: string[];
}

export const Dropdown = ({ selected, handleSelect, options }: DropdownProps) => {
  const [isActive, setIsActive] = useState(false);

  const onDropdownBtnClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.dropdown}>
      <div role="button" tabIndex={0} className={styles.dropdownBtn} onClick={onDropdownBtnClick}>
        {selected === '' ? options[0] : selected}
        <Arrow
          className={isActive ? `${styles.btnArrow} ${styles.btnArrowActive}` : styles.btnArrow}
        />
      </div>
      {isActive && (
        <div className={styles.dropdownContent}>
          {options.map((item) => (
            <div
              role="button"
              tabIndex={0}
              key={item}
              onClick={() => {
                handleSelect(item);
                setIsActive(false);
              }}
              className={styles.dropdownItem}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
