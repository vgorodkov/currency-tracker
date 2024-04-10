import { NavBlock } from '../NavBlock';
import { navBlock } from './constants';
import styles from './styles.module.scss';

export const HorizontalNav = () => {
  return (
    <nav className={styles.horizontalNav}>
      {navBlock.map((item) => (
        <NavBlock key={item.id} title={item.title} links={item.links} />
      ))}
    </nav>
  );
};
