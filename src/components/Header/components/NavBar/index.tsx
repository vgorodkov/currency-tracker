import { NavLink } from 'react-router-dom';

import Logo from '@/assets/icons/logo.svg';
import { ToggleThemeBtn } from '@/components/ToggleThemeBtn';

import styles from './styles.module.scss';

const ROUTES = [
  { path: '/', name: 'Home' },
  { path: '/timeline', name: 'Timeline' },
  { path: '/bankcard', name: 'Bank card' },
  { path: '/contacts', name: 'Contacts' },
];

export const NavBar = () => {
  return (
    <header className={styles.headerContainer}>
      <Logo className={styles.logo} />
      <nav className={styles.headerNav}>
        {ROUTES.map((item) => (
          <NavLink
            key={item.name}
            className={({ isActive }) =>
              isActive
                ? `${styles.activeHeaderNavElement} ${styles.headerNavElement}`
                : styles.headerNavElement
            }
            to={item.path}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <ToggleThemeBtn />
    </header>
  );
};
