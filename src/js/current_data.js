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
  const timeUtc = parseInt(data.ob_time.slice(11, 13));
  const timeDifference = getTimezone();
  const hours = formatHours(timeUtc, timeDifference);
  const min = formatMinutes(data.ob_time);
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

function formatHours (utc, difference) {
  return utc + difference >= 24 ? utc + difference - 24 : utc + difference;
}

function formatMinutes (date) {
  const minutes = parseInt(date.slice(14));

  return minutes > 9 ? minutes : `0${minutes}`;
}
