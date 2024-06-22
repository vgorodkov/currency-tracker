import { getTodayDate } from './getTodayDate';

describe('getTodayDate', () => {
  test('should return current date', () => {
    const currentDate = new Date();

    const expected = currentDate.getDate();

    expect(getTodayDate()).toBe(expected);
  });
});
