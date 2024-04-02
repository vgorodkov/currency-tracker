import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from '../store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();
