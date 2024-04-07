/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { getConvertedCurrency } from '@/api/convertCurrency';

import { createAppAsyncThunk } from '../helpers/createAppAsyncThunk';

interface Currency {
  code: string;
  rate: number;
}

export const convertCurrency = createAppAsyncThunk(
  'converter/convertCurrency',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const to = getState().converter.toCurrency.code;
      const from = getState().converter.fromCurrency.code;
      const response = await getConvertedCurrency(from, to);
      const { rate } = response.data;
      dispatch(setToCurrencyRate(rate));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export interface ConverterState {
  isConverterOpen: boolean;
  toCurrency: Currency;
  fromCurrency: Currency | null;
  fromRate: number;
  isLoading: boolean;
}

const initialState: ConverterState = {
  isConverterOpen: false,
  toCurrency: {
    code: '',
    rate: -1,
  },
  fromCurrency: null,
  fromRate: 0,
  isLoading: false,
};

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    openConverter: (state) => {
      state.isConverterOpen = true;
    },
    closeConverter: (state) => {
      state.isConverterOpen = false;
    },
    setFromCurrency: (state, action: PayloadAction<Currency>) => {
      const { code, rate } = action.payload;
      state.fromCurrency = { code, rate };
    },
    setToCurrencyCode: (state, action) => {
      state.toCurrency.code = action.payload;
    },
    setToCurrencyRate: (state, action) => {
      state.toCurrency.rate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(convertCurrency.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(convertCurrency.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const {
  openConverter,
  closeConverter,
  setFromCurrency,
  setToCurrencyCode,
  setToCurrencyRate,
} = converterSlice.actions;
export default converterSlice.reducer;
