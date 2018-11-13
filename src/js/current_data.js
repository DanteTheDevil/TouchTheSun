import {getTimezone} from './detail_data.js';

export function fillCurrentData (elem){
  const location = document.querySelector('.location__current-location');
  const weatherIconBlock = document.querySelector('.current-weather__icon');
  const temp = document.querySelector('.current-weather__temperature');
  const weather_data = document.querySelector('.current-weather__data').children;
  const data = elem.data[0];
  const cityName = data.city_name;
  const countryName = data.country_code;
  const weatherIcon = data.weather.icon;
  const pressure = data.pres;
  const humidity = data.rh;
  const wind = data.wind_spd;
  const tempSymbol = getSymbol(data.temp);
  const timeDifference = getTimezone();
  const hours = formatHours(new Date, timeDifference);
  const min = formatMinutes(new Date());
  const icons = {
    clock: '<i class="far fa-clock"></i>',
    pressure: '<i class="fas fa-compress"></i>',
    humidity: '<i class="fas fa-tint"></i>',
    wind: '<i class="fas fa-wind"></i>',
    location: '<i class="fas fa-map-marker-alt"></i>'
  };

  location.innerHTML = `${icons.location}<span>${cityName}, ${countryName}</span>`;
  weatherIconBlock.innerHTML = `<img src="./images/icons/${weatherIcon}.png">`;
  temp.innerHTML = `${Math.round(data.temp)}<img src="./images/icons/${tempSymbol}.png">`;
  weather_data[0].innerHTML = `${icons.clock}<span>${hours}:${min}</span>`;
  weather_data[1].innerHTML = `${icons.pressure}<span>${Math.round(pressure)} torr</span>`;
  weather_data[2].innerHTML = `${icons.humidity}<span>${humidity} %</span>`;
  weather_data[3].innerHTML = `${icons.wind}<span>${(wind).toFixed(1)} m/s</span>`;
}

export function getSymbol (value) {
  return value > 0 ? 'plus' : 'minus';
}

export function formatHours (date, difference) {
  const localZone = date.getTimezoneOffset() / 60;
  const utcHours = date.getHours() + localZone;

  if (utcHours + difference === 24) {
    return '00';
  } else if (utcHours + difference > 24) {
    return utcHours + difference - 24;
  } else {
    return utcHours + difference;
  }
}

export function formatMinutes (date) {
  const minutes = date.getMinutes();

  return minutes > 9 ? minutes : `0${minutes}`;
}
