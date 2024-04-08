/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
    return storedTheme;
  }

  if (userMedia.matches) {
    return 'light';
  }

  localStorage.setItem('theme', 'dark');
  return 'dark';
};

export interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
