import { OHLC } from '@/types/candlestickChart';

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getMockPriceData(period: number) {
  const prices: OHLC[] = [];

  for (let i = 0; i < period; i += 1) {
    let openPrice;
    let closePrice;

    if (i === 0) {
      openPrice = getRandomNumber(1, 1000);
      closePrice = getRandomNumber(1, 1000);
    } else {
      openPrice = prices[i - 1].closePrice;
      closePrice = getRandomNumber(1, 1000);
    }

    while (closePrice === openPrice) {
      closePrice = getRandomNumber(1, 1000);
    }

    const highPrice = getRandomNumber(Math.max(openPrice, closePrice), 1000);
    const lowPrice = getRandomNumber(1, Math.min(openPrice, closePrice));

    prices.push({ openPrice, highPrice, lowPrice, closePrice });
  }

  return prices;
}

// Example usage:
const priceData = getMockPriceData(10);
console.log(priceData);
