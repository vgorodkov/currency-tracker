/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { currencies } from '@/constants/currencies';
import { CandlestickData, ChartDayData, Pricetype } from '@/types/candlestickChart';

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

interface ChartInputState {
  isInputModalOpen: boolean;
  targetCurrency: string;
  chartData: CandlestickData[];
  chartDayData: ChartDayData;
}

const initialState: ChartInputState = {
  isInputModalOpen: false,
  targetCurrency: currencies[0],

  chartDayData: {
    date: formatDate(new Date(Date.now())),
    openPrice: 0,
    highPrice: 0,
    lowPrice: 0,
    closePrice: 0,
  },
  chartData: [],
};

export const candlestickChartSlice = createSlice({
  name: 'candlestickChart',
  initialState,
  reducers: {
    setTargetCurrency: (state, action: PayloadAction<string>) => {
      if (action.payload === state.targetCurrency) {
        return;
      }

      state.chartData = [];
      state.targetCurrency = action.payload;
    },
    setInputModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isInputModalOpen = action.payload;
    },
    setDate: (state, action) => {
      if (action.payload) {
        state.chartDayData.date = action.payload;
      }
    },
    setPrice: (state, action: PayloadAction<{ priceType: Pricetype; price: number }>) => {
      const { priceType, price } = action.payload;

      if (Number.isNaN(price)) {
        state.chartDayData[priceType] = 0;
        return;
      }

      if (priceType === Pricetype.OPEN && state.chartData.length >= 1) {
        const prevDayClosePrise = state.chartData[state.chartData.length - 1].closePrice;
        state.chartDayData.openPrice = prevDayClosePrise;
        return;
      }
      state.chartDayData[priceType] = Math.max(0, price);
    },
    setChartData: (state) => {
      const { closePrice, openPrice, highPrice, lowPrice, date } = state.chartDayData;
      const timestamp = new Date(date).getTime();

      const newChartDataItem: CandlestickData = {
        timestamp,
        openPrice,
        highPrice,
        lowPrice,
        closePrice,
        settlementPrice: [openPrice, closePrice],
      };

      state.chartData.push(newChartDataItem);
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      state.chartDayData = {
        date: formatDate(newDate),
        openPrice: state.chartData[state.chartData.length - 1].closePrice,
        closePrice: 0,
        lowPrice: 0,
        highPrice: 0,
      };
    },
  },
});

export const { setTargetCurrency, setInputModalOpen, setDate, setPrice, setChartData } =
  candlestickChartSlice.actions;

export default candlestickChartSlice.reducer;
