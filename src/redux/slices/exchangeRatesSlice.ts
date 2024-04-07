/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getExchangeRates } from '@/api/getExchangeRates';
import { ExchangeAsset } from '@/types';

import { createAppAsyncThunk } from '../helpers/createAppAsyncThunk';

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
      if (state.exchangeRates.cachedDate < new Date(Date.now()).getDate()) {
        return true;
      }

      if (state.exchangeRates.exchangeRates) {
        return false;
      }
      return true;
    },
  }
);

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
  reducers: {
    setCachedDate: (state, action) => {
      state.cachedDate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.cachedDate = new Date(Date.now()).getDate();
        state.exchangeRates = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchExchangeRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default exchangeRatesSlice.reducer;
