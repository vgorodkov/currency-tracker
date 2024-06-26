import { useState } from 'react';
import { useSelector } from 'react-redux';

import ArrowDown from '@/assets/icons/chevron_down.svg';
import { themeSelector } from '@/store/slices/themeSlice/themeSelectors';

import { Accordion } from '../Accordion';
import styles from './styles.module.scss';
import { NavBlockProps } from './types';

export const NavBlock = ({ title, links }: NavBlockProps) => {
  const theme = useSelector(themeSelector);
  const [isAccordionActive, setIsAccordionActive] = useState(false);

  const isDark = theme === 'dark';

  const toggleAccordionActivity = () => {
    setIsAccordionActive(!isAccordionActive);
  };

  return (
    <>
      <div className={styles.navBlock}>
        <h3>{title}</h3>
        <div className={styles.navBlockLinks}>
          {links.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <ArrowDown
          stroke={isDark ? 'white' : 'black'}
          onClick={toggleAccordionActivity}
          className={
            isAccordionActive
              ? `${styles.accordionArrow} ${styles.activeAccordion}`
              : styles.accordionArrow
          }
        />
      </div>
      <Accordion links={links} isAccordionActive={isAccordionActive} />
    </>
  );
};
