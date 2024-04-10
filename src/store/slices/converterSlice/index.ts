import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ConvertedCurrency, Currency } from '@/types/converter';
import { getDate } from '@/utils/getDate';

import { convertCurrency } from './converterThunk';

export interface ConverterState {
  isConverterOpen: boolean;
  toCurrency: Currency;
  fromCurrency: Currency | null;
  isLoading: boolean;
  convertedList: ConvertedCurrency[];
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
  convertedList: [],
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
    revalidateConverted: (state) => {
      state.convertedList = state.convertedList.filter(
        (item: ConvertedCurrency) => item.cachedDate >= getDate()
      );
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
        state.convertedList.push(newConverted);

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
  revalidateConverted,
} = converterSlice.actions;
export default converterSlice.reducer;
