/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { getConvertedCurrency } from '@/api/convertCurrency';
import { getDate } from '@/utils/getDate';

import { createAppAsyncThunk } from '../helpers/createAppAsyncThunk';

interface Currency {
  code: string;
  rate: number;
}

interface ConvertedCurrency extends Currency {
  cachedDate: number | null;
}

export const convertCurrency = createAppAsyncThunk(
  'converter/convertCurrency',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      dispatch(revalidatedConverted());

      const { toCurrency: to, fromCurrency: from, converted: convertedList } = getState().converter;

      const convertedItem = convertedList.find((item) => item.code === `${from.code}-${to.code}`);

      if (convertedItem) {
        if (convertedItem.cachedDate >= getDate()) {
          return {
            fromCode: from.code,
            toCode: to.code,
            rate: convertedItem.rate,
          };
        }
      }

      const response = await getConvertedCurrency(from.code, to.code);
      const { rate, asset_id_base: fromCode, asset_id_quote: toCode } = response.data;

      return {
        fromCode,
        toCode,
        rate,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export interface ConverterState {
  isConverterOpen: boolean;
  toCurrency: Currency;
  fromCurrency: Currency | null;
  isLoading: boolean;
  converted: ConvertedCurrency[];
  error: string | null;
}

const initialState: ConverterState = {
  isConverterOpen: false,
  toCurrency: {
    code: '',
    rate: -1,
  },
  fromCurrency: null,
  isLoading: false,
  converted: [],
  error: null,
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
    setToCurrencyCode: (state, action: PayloadAction<string>) => {
      state.toCurrency.code = action.payload;
    },
    setToCurrencyRate: (state, action: PayloadAction<number>) => {
      state.toCurrency.rate = action.payload;
    },
    revalidatedConverted: (state) => {
      state.converted = state.converted.filter((item) => item.cachedDate >= getDate());
    },
  },
  extraReducers(builder) {
    builder
      .addCase(convertCurrency.fulfilled, (state, action) => {
        const { rate, fromCode, toCode } = action.payload;

        state.toCurrency.rate = rate;

        const newConverted: ConvertedCurrency = {
          code: `${fromCode}-${toCode}`,
          rate,
          cachedDate: getDate(),
        };
        state.converted.push(newConverted);

        state.isLoading = false;
      })
      .addCase(convertCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(convertCurrency.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  openConverter,
  closeConverter,
  setFromCurrency,
  setToCurrencyCode,
  setToCurrencyRate,
  revalidatedConverted,
} = converterSlice.actions;
export default converterSlice.reducer;
