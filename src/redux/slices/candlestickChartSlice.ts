/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { CandlestickData, OHLC, SetPriceArgs } from '@/types';

interface ChartInputState {
  date: string;
  ohlc: OHLC;
  chartData: CandlestickData[];
  isInputModalOpen: boolean;
}

const initialState: ChartInputState = {
  isInputModalOpen: false,
  date: new Date(Date.now()).toISOString().slice(0, 10),
  ohlc: {
    o: 0,
    h: 0,
    l: 0,
    c: 0,
  },
  chartData: [],
};

export const candlestickChartSlice = createSlice({
  name: 'candlestickChart',
  initialState,
  reducers: {
    setInputModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isInputModalOpen = action.payload;
    },
    setPrice: (state, action: PayloadAction<SetPriceArgs>) => {
      const { priceType, price } = action.payload;

      if (priceType === 'o' && state.chartData.length >= 1) {
        state.ohlc[priceType] = state.chartData[state.chartData.length - 1]?.c;
        return;
      }
      state.ohlc[priceType] = Math.max(0, price);
    },

    setDate: (state, action) => {
      state.date = action.payload;
    },
    setChartData: (state) => {
      const { o, c, h, l } = state.ohlc;
      const timestamp = new Date(state.date).getTime();
      const newChartDataIem: CandlestickData = {
        x: timestamp,
        o,
        c,
        h,
        l,
        s: [o, c],
      };
      state.chartData.push(newChartDataIem);
      const date = new Date(state.date);
      date.setDate(date.getDate() + 1);
      state.date = date.toISOString().slice(0, 10);
      state.ohlc = {
        o: state.chartData[state.chartData.length - 1].c,
        c: 0,
        l: 0,
        h: 0,
      };
    },
  },
});

export const { setDate, setPrice, setChartData, setInputModalOpen } = candlestickChartSlice.actions;
export default candlestickChartSlice.reducer;
