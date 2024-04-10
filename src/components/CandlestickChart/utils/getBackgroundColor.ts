import { CandlestickContext } from '@/types/candlestickChart';

export const getBackgroundColor = (ctx: CandlestickContext) => {
  const {
    raw: { openPrice, closePrice },
  } = ctx;

  let color;
  if (closePrice >= openPrice) {
    color = '#16C782';
  } else {
    color = '#EA3943';
  }
  return color;
};
