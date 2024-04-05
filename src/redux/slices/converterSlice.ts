/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { getConvertedCurrency } from '@/api/convertCurrency';
import { BASE_CURRENCY } from '@/constants/currencies';
import { ConverterCurrency } from '@/types';

import { createAppAsyncThunk } from '../helpers/createAppAsyncThunk';

interface FromCurrency {
  code: string;
  rate: number;
}

export const convertCurrency = createAppAsyncThunk(
  'converter/convertCurrency',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const to = getState().converter.toCurrency;
      const from = getState().converter.fromCurrency.code;
      const response = await getConvertedCurrency(from, to);
      const { rate } = response.data;
      dispatch(setConvertedCurrencies({ fromCurrency: from, toCurrency: to, rate }));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const to = getState().converter.toCurrency;
      const from = getState().converter.fromCurrency.code;
      const isConverted = state.converter.convertedCurrencies.some(
        (converted) => converted.fromCurrency === from && converted.toCurrency === to
      );

      if (isConverted) {
        return false;
      }
      return true;
    },
  }
);

export interface ConverterState {
  isConverterOpen: boolean;
  toCurrency: string | null;
  fromCurrency: FromCurrency | null;
  fromRate: number;
  convertedCurrencies: ConverterCurrency[];
  isLoading: boolean;
}

const initialState: ConverterState = {
  isConverterOpen: false,
  toCurrency: null,
  fromCurrency: null,
  fromRate: 0,
  convertedCurrencies: [],
  isLoading: false,
};

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    openConverter: (state) => {
      state.toCurrency = BASE_CURRENCY;
      state.isConverterOpen = true;
    },
    closeConverter: (state) => {
      state.isConverterOpen = false;
    },
    setFromCurrency: (state, action: PayloadAction<FromCurrency>) => {
      const { code, rate } = action.payload;
      state.fromCurrency = { code, rate };
    },
    setToCurrency: (state, action) => {
      state.toCurrency = action.payload;
    },
    setConvertedCurrencies: (state, action: PayloadAction<ConverterCurrency>) => {
      const isAlreadyInList = state.convertedCurrencies.some(
        (currency) =>
          currency.fromCurrency === action.payload.fromCurrency &&
          currency.toCurrency === action.payload.toCurrency
      );

      if (isAlreadyInList) {
        return;
      }
      state.convertedCurrencies.push(action.payload);
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
  setConvertedCurrencies,
  setToCurrency,
} = converterSlice.actions;
export default converterSlice.reducer;
