/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { THEME_KEY, ThemeVariant } from '@/constants/theme';

const getInitialTheme = (): ThemeVariant => {
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

export interface ThemeState {
  theme: ThemeVariant;
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeVariant>) => {
      state.theme = action.payload;
      localStorage.setItem(THEME_KEY, action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
