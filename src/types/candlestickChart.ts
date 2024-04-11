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

export interface ChartDayData extends OHLC {
  timestamp: number;
}

export interface CandlestickData extends ChartDayData {
  settlementPrice: [number, number];
}

export interface SetPriceArgs {
  priceType: Pricetype;
  price: number;
}

export interface CandlestickContext extends ScriptableContext<'bar'> {
  raw: CandlestickData;
}

export interface ICandlestickChart extends Chart<'bar', CandlestickData[]> {}
