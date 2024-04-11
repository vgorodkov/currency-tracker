import { RootState } from '@/store/types';

export const isConverterOpenSelector = (state: RootState) => state.converter.isConverterOpen;
export const toCurrencySelector = (state: RootState) => state.converter.toCurrency;
export const fromCurrencySelector = (state: RootState) => state.converter.fromCurrency;
export const isConverterLoadingSelector = (state: RootState) => state.converter.isLoading;
export const convertedListSelector = (state: RootState) => state.converter.convertedList;
export const converterRrrorSelector = (state: RootState) => state.converter.error;
