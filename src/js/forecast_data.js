import {getSymbol} from './current_data.js';

export function fillForecastData (elem) {
  const daysDate = document.querySelectorAll('.day-info__date');
  const daysWeather = document.querySelectorAll('.day-info__weather');
  const daysTemp = document.querySelectorAll('.day-info__temp');
  const data = elem.data;

  for (let i = 0; i < 5; i++) {
    const date = data[i].datetime.split('-').reverse().join('-');
    const icon = data[i].weather.icon;
    const maxTemp = Math.round(data[i].max_temp);
    const minTemp = Math.round(data[i].min_temp);
    const maxTempSymbol = getSymbol(maxTemp);
    const minTempSymbol = getSymbol(minTemp);
    const tempIcons = {
      max: `<img src="./images/icons/${maxTempSymbol}.png">`,
      min: `<img src="./images/icons/${minTempSymbol}.png">`
    };

    daysDate[i].innerHTML = `${date}`;
    daysWeather[i].innerHTML = `<img src="./images/icons/${icon}.png">`;
    daysTemp[i].innerHTML = `${minTemp}${tempIcons.min}\xa0\xa0${maxTemp}${tempIcons.max}`;
  }
}
