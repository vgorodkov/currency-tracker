import { Pricetype } from '@/types/candlestickChart';

import { getMockPriceData } from '../getMockPriceData';

describe('getMockPriceData', () => {
  it('should return an array of OHLC prices of period', () => {
    const period = 10;
    const data = getMockPriceData(period);
    expect(data.length).toBe(period);
    expect(Array.isArray(data)).toBe(true);
  });

  it('should return OHLC prcies with correct properties', () => {
    const period = 5;
    const data = getMockPriceData(period);
    data.forEach((obj) => {
      expect(obj).toHaveProperty(Pricetype.OPEN);
      expect(obj).toHaveProperty(Pricetype.HIGH);
      expect(obj).toHaveProperty(Pricetype.LOW);
      expect(obj).toHaveProperty(Pricetype.CLOSE);
    });
  });
});
