//import {getTimezone} from './detail_data.js';

export function fillCurrentData (elem){
  const location = document.querySelector('.location__current-location');
  const weatherIconBlock = document.querySelector('.current-weather__icon');
  const temp = document.querySelector('.current-weather__temperature');
  const weatherDataElems = document.querySelector('.current-weather__data').children;
  const data = elem.data[0];
  const cityName = data.city_name;
  const countryName = data.country_code;
  const weatherIcon = data.weather.icon;
  const pressure = data.pres;
  const humidity = data.rh;
  const wind = data.wind_spd;
  const tempSymbol = getSymbol(data.temp);
  const time = getLocalTime(new Date(), data);
  const icons = {
    clock: '<i class="far fa-clock"></i>',
    pressure: '<i class="fas fa-compress"></i>',
    humidity: '<i class="fas fa-tint"></i>',
    wind: '<i class="fas fa-wind"></i>',
    location: '<i class="fas fa-map-marker-alt"></i>'
  };
  const weatherData = [
    [`${icons.clock}<span>${time}</span>`],
    [`${icons.pressure}<span>${Math.round(pressure)} torr</span>`],
    [`${icons.humidity}<span>${humidity} %</span>`],
    [`${icons.wind}<span>${(wind).toFixed(1)} m/s</span>`]
  ];

  location.innerHTML = `${icons.location}<span>${cityName}, ${countryName}</span>`;
  weatherIconBlock.innerHTML = `<img src="./images/icons/${weatherIcon}.png">`;
  temp.innerHTML = `${Math.round(data.temp)}<img src="./images/icons/${tempSymbol}.png">`;
  for (let i = 0; i <  weatherDataElems.length; i++) {
    weatherDataElems[i].innerHTML = weatherData[i];
  }
}

export function getSymbol (value) {
  return value > 0 ? 'plus' : 'minus';
}

export function getLocalTime (date, data) {
  const options = {hour: 'numeric', minute: 'numeric', timeZone: data.timezone};
  const time = new Intl.DateTimeFormat(data.country_code, options).format(date);
  const minutes = time.indexOf(':') === 1 ? time.slice(2, 4) : time.slice(3, 5);
  let hours = time.indexOf(':') === 1 ?
    parseInt(time.slice(0, 1), 10) :
    parseInt(time.slice(0, 2), 10);

  hours = time.includes('PM') ? hours + 12 : hours;
  return `${hours}:${minutes}`;
}
