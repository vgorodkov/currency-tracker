import { RootState } from '@/store/types';

export const isOpenSelector = (state: RootState) => state.converter.isConverterOpen;
export const toCurrencySelector = (state: RootState) => state.converter.toCurrency;
export const fromCurrencySelector = (state: RootState) => state.converter.fromCurrency;
export const isLoadingSelector = (state: RootState) => state.converter.isLoading;
export const convertedListSelector = (state: RootState) => state.converter.convertedList;
export const errorSelector = (state: RootState) => state.converter.error;
