import { NavLink } from 'react-router-dom';

import logo from '@/assets/icons/logo.svg?url';
import { ToggleThemeBtn } from '@/components/ToggleThemeBtn';
import { ROUTES } from '@/constants/routes';

import styles from './styles.module.scss';

export const NavBar = () => {
  return (
    <header className={styles.headerContainer}>
      <img src={logo} className={styles.logo} alt="logo" />
      <nav className={styles.headerNav}>
        {ROUTES.map((item) => (
          <NavLink
            data-test={`navlink-${item.name.toLowerCase()}`}
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
