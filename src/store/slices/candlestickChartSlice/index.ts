import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { currencies } from '@/constants/currencies';
import { CandlestickData, ChartDayData, Pricetype } from '@/types/candlestickChart';

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
    timestamp: Date.now(),
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
      state.chartData = [];
      state.targetCurrency = action.payload;
    },
    setInputModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isInputModalOpen = action.payload;
    },
    setDayTimestamp: (state, action: PayloadAction<number>) => {
      state.chartDayData.timestamp = action.payload;
    },
    setPrice: (state, action: PayloadAction<{ priceType: Pricetype; price: number }>) => {
      const { priceType, price } = action.payload;

      state.chartDayData[priceType] = price;
    },
    setChartData: (state) => {
      const { closePrice, openPrice, highPrice, lowPrice, timestamp } = state.chartDayData;

      const newChartDataItem: CandlestickData = {
        timestamp,
        openPrice,
        highPrice,
        lowPrice,
        closePrice,
        settlementPrice: [openPrice, closePrice],
      };

      state.chartData.push(newChartDataItem);

      const nextDay = new Date(timestamp);
      nextDay.setDate(nextDay.getDate() + 1);
      const newTimestamp = nextDay.getTime();

      state.chartDayData = {
        timestamp: newTimestamp,
        openPrice: state.chartData[state.chartData.length - 1].closePrice,
        closePrice: 0,
        lowPrice: 0,
        highPrice: 0,
      };
    },
  },
});

export const { setTargetCurrency, setInputModalOpen, setDayTimestamp, setPrice, setChartData } =
  candlestickChartSlice.actions;

export default candlestickChartSlice.reducer;
