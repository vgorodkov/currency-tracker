import { NavBlock } from '../NavBlock';
import styles from './styles.module.scss';

const navBlock = [
  {
    id: 0,
    title: 'General',
    links: ['Market', 'Service'],
  },
  {
    id: 1,
    title: 'Product',
    links: ['Sparks', 'Snaps'],
  },
  {
    id: 2,
    title: 'Community',
    links: ['Ideas', 'Streams'],
  },
];

export const HorizontalNav = () => {
  return (
    <nav className={styles.horizontalNav}>
      {navBlock.map((item) => (
        <NavBlock key={item.id} title={item.title} links={item.links} />
      ))}
    </nav>
  );
};
