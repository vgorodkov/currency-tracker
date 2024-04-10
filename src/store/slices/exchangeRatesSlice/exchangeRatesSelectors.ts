import { RootState } from '@/store/types';

export const exchangeRatesSelector = (state: RootState) => state.exchangeRates.exchangeRates;
export const isLoadingSelector = (state: RootState) => state.exchangeRates.isLoading;
export const cachedDateSelector = (state: RootState) => state.exchangeRates.cachedDate;
