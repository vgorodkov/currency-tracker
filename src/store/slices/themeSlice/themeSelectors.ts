import { RootState } from '@/store/types';

export const themeSelector = (state: RootState) => state.theme.theme;
