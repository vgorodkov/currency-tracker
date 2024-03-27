import { Link } from 'react-router-dom';
import Logo from '@/assets/icons/logo.svg';
import { ToggleThemeBtn } from '@/components/ToggleThemeBtn';
import styles from './styles.module.scss';

const ROUTES = [
  { path: '/', name: 'Home' },
  { path: '/timeline', name: 'Timeline' },
  { path: '/bankcard', name: 'Bank card' },
  { path: '/contacts', name: 'Contacts' },
];

export function HeaderNav() {
  return (
    <div className={styles.headerNavContainer}>
      <div className={styles.headerSide}>
        <Logo className={styles.logo} />
      </div>
      <nav className={styles.headerNav}>
        {ROUTES.map((item) => (
          <Link
            key={item.name}
            className={styles.headerNavElement}
            to={item.path}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className={styles.headerSide}>
        <ToggleThemeBtn />
      </div>
    </div>
  );
}
