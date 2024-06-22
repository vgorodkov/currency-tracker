import { OHLC } from '@/types/candlestickChart';
import { getRandomNumberInRange } from '@/utils/getRandomNumberInRange';

export const getMockPriceData = (period: number) => {
  const prices: OHLC[] = [];

  for (let i = 0; i < period; i += 1) {
    let openPrice;
    let closePrice;

    if (i === 0) {
      openPrice = getRandomNumberInRange(1, 1000);
      closePrice = getRandomNumberInRange(1, 1000);
    } else {
      openPrice = prices[i - 1].closePrice;
      closePrice = getRandomNumberInRange(1, 1000);
    }

    while (closePrice === openPrice) {
      closePrice = getRandomNumberInRange(1, 1000);
    }

    const highPrice = getRandomNumberInRange(Math.max(openPrice, closePrice), 1000);
    const lowPrice = getRandomNumberInRange(1, Math.min(openPrice, closePrice));

    prices.push({ openPrice, highPrice, lowPrice, closePrice });
  }

  return prices;
};
