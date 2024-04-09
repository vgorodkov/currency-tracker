import { Chart, ScriptableContext } from 'chart.js/dist/types/index';

export enum Pricetype {
  OPEN = 'openPrice',
  HIGH = 'highPrice',
  LOW = 'lowPrice',
  CLOSE = 'closePrice',
}

export interface OHLC {
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
}

export interface SetPriceArgs {
  priceType: Pricetype;
  price: number;
}

export interface CandlestickData extends OHLC {
  timestamp: number;
  settlementPrice: [number, number];
}

export interface ChartDayData extends OHLC {
  date: string;
}

export interface CandlestickContext extends ScriptableContext<'bar'> {
  raw: CandlestickData;
}

export interface ICandlestickChart extends Chart<'bar', CandlestickData[]> {}
