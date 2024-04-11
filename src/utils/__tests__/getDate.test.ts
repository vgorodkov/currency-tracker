import { getDate } from '../getDate';

describe('getDate', () => {
  test('should return current date', () => {
    const currentDate = new Date();

    const expected = currentDate.getDate();

    expect(getDate()).toBe(expected);
  });
});
