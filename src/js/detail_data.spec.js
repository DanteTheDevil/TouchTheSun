import {fixTimezoneHours} from './detail_data.js';

test('Must fix timezone hours', () => {
  expect(fixTimezoneHours([
    {timestamp_local: '2018-11-15T01'},
    {timestamp_local: '2018-11-15T22'},
    {timestamp_local: '2018-11-15T16'},
    {timestamp_local: '2018-11-15T07'},
    {timestamp_local: '2018-11-15T19'},
    {timestamp_local: '2018-11-15T10'},
    {timestamp_local: '2018-11-15T04'},
    {timestamp_local: '2018-11-15T13'},
  ]
  )).toEqual(['01:00', '04:00', '07:00', '10:00', '13:00', '16:00', '19:00', '22:00']);
});
