import { formatDate } from '../formatDate';

describe('formatDate', () => {
  test('should format date correctly', () => {
    const date = new Date('2024-04-11T12:00:00Z');

    const expected = '2024-04-11';

    expect(formatDate(date)).toBe(expected);
  });
  test('should throw an error for invalid input', () => {
    expect(() => formatDate('123123123')).toThrow(TypeError);
  });
});
