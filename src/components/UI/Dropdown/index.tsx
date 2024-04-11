import { KeyboardEvent, useState } from 'react';

import Arrow from '@/assets/icons/chevron_down.svg';

import styles from './styles.module.scss';
import { DropdownProps } from './types';

export const Dropdown = ({ selected, handleSelect, options, pos = 'below' }: DropdownProps) => {
  const [isActive, setIsActive] = useState(false);

  const isAbove = pos === 'above';

  const onDropdownBtnClick = () => {
    setIsActive(!isActive);
  };

  const onDropdownOptionClick = (option: string) => () => {
    handleSelect(option);
    setIsActive(false);
  };

  const onDropdownBtnKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.code === 'Escape') {
      setIsActive(!isActive);
    }
  };

  return (
    <div className={styles.dropdown}>
      <div
        onKeyDown={onDropdownBtnKeyDown}
        role="button"
        tabIndex={0}
        className={styles.dropdownBtn}
        onClick={onDropdownBtnClick}
      >
        {selected === '' ? options[0] : selected}
        <div className={styles.btnArrowContainer}>
          <Arrow
            className={isActive ? `${styles.btnArrow} ${styles.btnArrowActive}` : styles.btnArrow}
          />
        </div>
      </div>
      {isActive && (
        <div className={styles.dropdownContent} data-pos={isAbove ? 'above' : 'below'}>
          {options.map((option) => (
            <option
              tabIndex={0}
              key={option}
              onClick={onDropdownOptionClick(option)}
              className={styles.dropdownItem}
            >
              {option}
            </option>
          ))}
        </div>
      )}
    </div>
  );
};
