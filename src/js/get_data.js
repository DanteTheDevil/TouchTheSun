import {fillForecastData} from './forecast_data';
import {createDetailData} from './detail_data';
import {fillCurrentData} from './current_data';

export function getData (city) {
  const daily_forecast = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
  const curr_forecast = 'https://api.weatherbit.io/v2.0/current?city=';
  const detail_forecast = 'https://api.weatherbit.io/v2.0/forecast/3hourly?city=';
  const api_id = '92e13964b3354f2e95d5972b30cbd727';
  let url = `${curr_forecast}${city}&key=${api_id}`;

  new Request(url)
    .then(response => {
      fillCurrentData(JSON.parse(response));
      url = `${daily_forecast}${city}&days=5&key=${api_id}`;
      return new Request(url);
    })
    .then(response => {
      fillForecastData(JSON.parse(response));
      url = `${detail_forecast}${city}&key=${api_id}`;
      return new Request(url);
    })
    .then(response => createDetailData(JSON.parse(response)))
    .catch(error => {
      switch (error.code) {
        case 204: {
          hintUpdate('You have typed a wrong city name. Try again!');
          throw new Error(`\n Error: ${error.code}\n Message: ${error.message}`);
        }
      }
    });
}

function Request (url) {
  return new Promise(function (resolve, reject) {
    const message = new XMLHttpRequest();

    message.open('GET', url, true);
    message.send();
    message.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
  });
}

function hintUpdate (text) {
  let colorChanged = false;
  const hintText = document.querySelector('.hint-text');
  const questionIcon = document.querySelector('.fa-question-circle');
  const previousText = hintText.innerHTML;
  const updateTime = 7000;
  const colorChangeTime = 400;
  const iconChangeTimer = setInterval(() => {
    if (!colorChanged) {
      questionIcon.style.color = 'red';
      colorChanged = true;
    } else {
      questionIcon.style.color = 'white';
      colorChanged = false;
    }
  }, colorChangeTime);

  hintText.innerHTML = text;
  setTimeout(() => {
    hintText.innerHTML = previousText;
    questionIcon.style.color = 'white';
    colorChanged = false;
    clearInterval(iconChangeTimer);
  }, updateTime);
}
