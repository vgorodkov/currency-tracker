import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

import { ExchangeAsset } from '@/types/exchangeRates';
import { getDate } from '@/utils/getDate';

import { fetchExchangeRates } from './exchangeRatesThunk';

export interface ExchangeRatesState {
  exchangeRates: ExchangeAsset[] | null;
  isLoading: boolean;
  error: string | null;
  cachedDate: number | null;
}

const initialState: ExchangeRatesState = {
  exchangeRates: null,
  isLoading: true,
  error: null,
  cachedDate: null,
};

export const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.cachedDate = getDate();
        state.exchangeRates = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchExchangeRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(PURGE, (state) => {
        if (state.cachedDate < getDate()) {
          state.exchangeRates = [];
        }
      });
  },
});

export default exchangeRatesSlice.reducer;
