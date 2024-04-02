/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getExchangeRates } from '@/api/getExchangeRates';
import { ExchangeAsset } from '@/types';

import { createAppAsyncThunk } from '../helpers/createAppAsyncThunk';

export interface ExchangeRatesState {
  exchangeRates: ExchangeAsset[] | null;
  isLoading: boolean;
  error: string | null;
}

export const fetchExchangeRates = createAppAsyncThunk(
  'exchangeRates/fetchExchangeRates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getExchangeRates();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      if (state.exchangeRates.exchangeRates) {
        return false;
      }
      return true;
    },
  }
);

const initialState: ExchangeRatesState = {
  exchangeRates: null,
  isLoading: false,
  error: null,
};

export const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.exchangeRates = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchExchangeRates.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default exchangeRatesSlice.reducer;
