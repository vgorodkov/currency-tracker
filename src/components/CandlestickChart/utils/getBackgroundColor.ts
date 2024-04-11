import { CandlestickContext } from '@/types/candlestickChart';

import { colors } from '../constants';

export const getBackgroundColor = (ctx: CandlestickContext) => {
  const {
    raw: { openPrice, closePrice },
  } = ctx;

  let color;
  if (closePrice >= openPrice) {
    color = colors.upPrice;
  } else {
    color = colors.downPrice;
  }
  return color;
};
