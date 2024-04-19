import { getRandomNumberInRange } from './getRandomNumberInRange';

describe('getRandomNumberInRange', () => {
  test('should return a random number in range', () => {
    const min = 1;
    const max = 100;
    const randomNumber = getRandomNumberInRange(min, max);
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  test('should return a random number in negative range', () => {
    const min = -100;
    const max = -1;
    const randomNumber = getRandomNumberInRange(min, max);
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });
});
