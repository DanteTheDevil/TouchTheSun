import {fillDetailData, createDetailData} from './detail_data.js';
import {fillForecastData} from './forecast_data';
import {fillCurrentData} from './current_data';

export function getData (city, hint, elem) {
  const daily_forecast = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
  const curr_forecast = 'https://api.weatherbit.io/v2.0/current?city=';
  const detail_forecast = 'https://api.weatherbit.io/v2.0/forecast/3hourly?city=';
  const api_id = '92e13964b3354f2e95d5972b30cbd727';
  let url = `${detail_forecast}${city}&key=${api_id}`;

  loading('start', hint, elem);
  new Request(url)
    .then(response => {
      createDetailData(JSON.parse(response));
      fillDetailData(0);
      url = `${daily_forecast}${city}&days=5&key=${api_id}`;
      return new Request(url);
    })
    .then(response => {
      fillForecastData(JSON.parse(response));
      url = `${curr_forecast}${city}&key=${api_id}`;
      return new Request(url);
    })
    .then(response => {
      fillCurrentData(JSON.parse(response));
      setTimeout(() => loading('success', hint, elem), 4000);
    })
    .catch(error => {
      switch (error.code) {
        case 204: {
          setTimeout(() => loading('error', hint, elem), 2000);
          hintUpdate(hint, 'You have typed a wrong city name.\n Try again');
        }
      }
    });
}

function Request (url) {
  return new Promise((resolve, reject) => {
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

function loading (type, hint, elem) {
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const loadingPage = document.querySelector('.loading-page');
  const loadingIcon = document.querySelector('.loading-page__loading-icon');
  const body = document.body;

  if (elem === 'loading-search'){
    switch (type) {
      case 'start': {
        hint.classList.add('hidden');
        loadingIcon.classList.remove('hidden');
        break;
      }
      case 'success': {
        main.classList.remove('hidden');
        header.classList.remove('hidden');
        footer.classList.remove('hidden');
        loadingPage.classList.add('hidden');
        body.style.overflow = 'auto';
        break;
      }
      case 'error': {
        hint.classList.remove('hidden');
        loadingIcon.classList.add('hidden');
        break;
      }
    }
  }
}

function hintUpdate (hintElem, text) {
  let colorChanged = false;
  const questionIcon = hintElem.querySelector('.fa-question-circle');
  const previousText = hintElem.innerHTML;
  const hintText = hintElem.lastElementChild;
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
    hintElem.innerHTML = previousText;
    questionIcon.style.color = 'white';
    colorChanged = false;
    clearInterval(iconChangeTimer);
  }, updateTime);
}
