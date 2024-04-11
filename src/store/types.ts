import { createAsyncThunk } from '@reduxjs/toolkit';

import { store } from '.';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();
