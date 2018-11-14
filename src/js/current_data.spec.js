import {getLocalTime} from './current_data.js';

test('Must return local time of a country', () => {
  expect(getLocalTime(
    new Date(1542208189999),
    {
      country_code: 'US',
      timezone: 'America/Detroit'
    })).toBe('10:09');
  expect(getLocalTime(
    new Date(1542208189999),
    {
      country_code: 'AU',
      timezone: 'Australia/Sydney'
    })).toBe('2:09');
  expect(getLocalTime(
    new Date(1542208189999),
    {
      country_code: 'GB',
      timezone: 'Europe/London'
    })).toBe('15:09');
});

