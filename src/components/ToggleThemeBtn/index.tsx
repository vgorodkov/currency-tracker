/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { setTheme } from '@/redux/slices/themeSlice';
import { RootState, useAppDispatch } from '@/redux/store';

import styles from './styles.module.scss';

export const ToggleThemeBtn = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useAppDispatch();

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
