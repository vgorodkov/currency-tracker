import { RootState } from '@/store/types';

export const exchangeRatesSelector = (state: RootState) => state.exchangeRates.exchangeRates;
export const isRatesLoadingSelector = (state: RootState) => state.exchangeRates.isLoading;
export const cachedRatesDateSelector = (state: RootState) => state.exchangeRates.cachedDate;
