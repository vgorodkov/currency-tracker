/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { currencies } from '@/constants/currencies';
import { CandlestickData } from '@/types';

export enum Pricetype {
  o = 'o',
  h = 'h',
  l = 'l',
  c = 'c',
}

export interface ChartDayData {
  date: string;
  o: number;
  h: number;
  l: number;
  c: number;
}

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
    date: new Date(Date.now()).toISOString().slice(0, 10),
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
    setTargetCurrency: (state, action: PayloadAction<string>) => {
      state.chartData = [];
      state.targetCurrency = action.payload;
    },
    setInputModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isInputModalOpen = action.payload;
    },
    setDate: (state, action) => {
      state.chartDayData.date = action.payload;
    },
    setPrice: (state, action: PayloadAction<{ priceType: Pricetype; price: number }>) => {
      const { priceType, price } = action.payload;
      if (priceType === Pricetype.o && state.chartData.length >= 1) {
        const prevDayClosePrise = state.chartData[state.chartData.length - 1].c;
        state.chartDayData.o = prevDayClosePrise;
        return;
      }
      state.chartDayData[priceType] = Math.max(0, price);
    },
    setChartData: (state) => {
      const { c, o, h, l, date } = state.chartDayData;
      const timestamp = new Date(date).getTime();

      const newChartDataItem: CandlestickData = {
        x: timestamp,
        o,
        h,
        l,
        c,
        s: [o, c],
      };

      state.chartData.push(newChartDataItem);
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      state.chartDayData = {
        date: newDate.toISOString().slice(0, 10),
        o: state.chartData[state.chartData.length - 1].c,
        c: 0,
        l: 0,
        h: 0,
      };
    },
  },
});

export const { setTargetCurrency, setInputModalOpen, setDate, setPrice, setChartData } =
  candlestickChartSlice.actions;

export default candlestickChartSlice.reducer;
