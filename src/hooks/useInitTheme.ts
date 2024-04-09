import { useEffect } from 'react';

import { THEME_DATA_ATTR, THEME_KEY, ThemeVariant } from '@/constants/theme';

export const useInitTheme = () => {
  useEffect(() => {
    const theme = localStorage.getItem(THEME_KEY) || ThemeVariant.LIGHT;
    document.documentElement.setAttribute(THEME_DATA_ATTR, theme);
  }, []);
};
