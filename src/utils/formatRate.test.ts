import { formatRate } from './formatRate';

describe('formatRate', () => {
  test('should format positive rate correctly', () => {
    const rate = 0.123456789;
    const expected = 0.12;

    expect(formatRate(rate)).toBe(expected);
  });

  test('should format negative rate as "???"', () => {
    const rate = -0.123;
    const expected = '???';

    expect(formatRate(rate)).toBe(expected);
  });

  test('should format rate with toFlip correctly', () => {
    const rate = 0.5;
    const expected = 2;

    expect(formatRate(rate, true)).toBe(expected);
  });

  test('should format rate with precision < 0.01 correctly', () => {
    const rate = 0.00000000123456789;
    const expected = 0.00000001;

    expect(formatRate(rate)).toBeCloseTo(expected);
  });
});
