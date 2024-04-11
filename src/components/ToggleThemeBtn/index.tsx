/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSelector } from 'react-redux';

import { ThemeVariant } from '@/constants/theme';
import { useAppDispatch } from '@/store/hooks';
import { setTheme } from '@/store/slices/themeSlice';
import { themeSelector } from '@/store/slices/themeSlice/themeSelectors';

import styles from './styles.module.scss';

export const ToggleThemeBtn = () => {
  const theme = useSelector(themeSelector);
  const dispatch = useAppDispatch();

  const isDark = theme === ThemeVariant.DARK;

  const toggleTheme = () => {
    const newTheme = theme === ThemeVariant.DARK ? ThemeVariant.LIGHT : ThemeVariant.DARK;
    document.documentElement.setAttribute('data-theme', newTheme);
    dispatch(setTheme(newTheme));
  };

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
