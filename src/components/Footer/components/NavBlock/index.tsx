import { useState } from 'react';

import ArrowDown from '@/assets/icons/chevron_down.svg';
import { useTheme } from '@/context/ThemeContext';

import { Accordion } from '../Accordion';
import styles from './styles.module.scss';

interface NavBlockProps {
  title: string;
  links: string[];
}

export const NavBlock = ({ title, links }: NavBlockProps) => {
  const { theme } = useTheme();
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
