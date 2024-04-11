import { THEME_KEY, ThemeVariant } from '@/constants/theme';

export const getInitialTheme = (): ThemeVariant => {
  try {
    if (typeof window === 'undefined') {
      return ThemeVariant.LIGHT;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    const storedTheme = localStorage.getItem(THEME_KEY);

    if (storedTheme && (storedTheme === ThemeVariant.DARK || storedTheme === ThemeVariant.LIGHT)) {
      return storedTheme;
    }

    if (userMedia.matches) {
      return ThemeVariant.LIGHT;
    }

    localStorage.setItem(THEME_KEY, ThemeVariant.DARK);
    return ThemeVariant.DARK;
  } catch {
    return ThemeVariant.LIGHT;
  }
};
