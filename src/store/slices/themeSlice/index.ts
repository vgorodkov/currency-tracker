import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { THEME_KEY, ThemeVariant } from '@/constants/theme';
import { getInitialTheme } from '@/utils/getInitialTheme';

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
