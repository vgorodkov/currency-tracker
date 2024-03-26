import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const ROUTES = [
  { path: '/', name: 'Home' },
  { path: '/timeline', name: 'Timeline' },
  { path: '/bankcard', name: 'Bank card' },
  { path: '/contacts', name: 'Contacts' },
];

export function Header() {
  return (
    <nav className={styles.topnav}>
      {ROUTES.map((item) => (
        <Link key={item.name} className={styles.navElement} to={item.path}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
