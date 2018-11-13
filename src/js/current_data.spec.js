import {formatHours, formatMinutes} from './current_data.js';

test('Must format to local hours', () => {
  expect(formatHours(new Date(1542117835629), 1)).toBe(15);
  expect(formatHours(new Date(1542117835629), 2)).toBe(16);
  expect(formatHours(new Date(1542117835629), 3)).toBe(17);
  expect(formatHours(new Date(1542117835629), 4)).toBe(18);
  expect(formatHours(new Date(1542117835629), 5)).toBe(19);
  expect(formatHours(new Date(1542117835629), 6)).toBe(20);
  expect(formatHours(new Date(1542117835629), 7)).toBe(21);
  expect(formatHours(new Date(1542117835629), 8)).toBe(22);
  expect(formatHours(new Date(1542117835629), 9)).toBe(23);
  expect(formatHours(new Date(1542117835629), 10)).toBe('00');
  expect(formatHours(new Date(1542117835629), 11)).toBe(1);
  expect(formatHours(new Date(1542117835629), 12)).toBe(2);
  expect(formatHours(new Date(1542117835629), 0)).toBe(14);
  expect(formatHours(new Date(1542117835629), -1)).toBe(13);
  expect(formatHours(new Date(1542117835629), -2)).toBe(12);
  expect(formatHours(new Date(1542117835629), -3)).toBe(11);
  expect(formatHours(new Date(1542117835629), -4)).toBe(10);
  expect(formatHours(new Date(1542117835629), -5)).toBe(9);
  expect(formatHours(new Date(1542117835629), -6)).toBe(8);
  expect(formatHours(new Date(1542117835629), -7)).toBe(7);
  expect(formatHours(new Date(1542117835629), -8)).toBe(6);
  expect(formatHours(new Date(1542117835629), -9)).toBe(5);
  expect(formatHours(new Date(1542117835629), -10)).toBe(4);
  expect(formatHours(new Date(1542117835629), -11)).toBe(3);
  expect(formatHours(new Date(1542117835629), -12)).toBe(2);
});

test('Must get minutes', () => {
  expect(formatMinutes(new Date(1542117835629))).toBe('03');
  expect(formatMinutes(new Date(1542119287982))).toBe(28);
});
