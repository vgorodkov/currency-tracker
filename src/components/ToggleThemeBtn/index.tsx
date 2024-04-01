/* eslint-disable jsx-a11y/label-has-associated-control */
import { useTheme } from '@/context/ThemeContext';

import styles from './styles.module.scss';

export const ToggleThemeBtn = () => {
  const { toggleTheme, theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <input
        defaultChecked={isDark}
        className={styles.input}
        type="checkbox"
        id="darkmode-toggle"
        onClick={toggleTheme}
      />
      <label className={styles.label} htmlFor="darkmode-toggle" />
    </>
  );
};
