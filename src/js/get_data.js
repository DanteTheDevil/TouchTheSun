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

  request(url)
    .then(response => {
      createDetailData(response);
      fillDetailData(0);
      url = `${daily_forecast}${city}&days=5&key=${api_id}`;
      return request(url);
    })
    .then(response => {
      fillForecastData(response);
      url = `${curr_forecast}${city}&key=${api_id}`;
      return request(url);
    })
    .then(response => {
      const loadingTime = 4000;
      fillCurrentData(response);
      setTimeout(() => loading('success', hint, elem), loadingTime);
    })
    .catch(error => {
      const errorCode = parseInt(error.message, 10);

      switch (errorCode) {
        case 204: {
          const loadingTime = 2000;

          setTimeout(() => loading('error', hint, elem), loadingTime);
          hintUpdate(hint, 'You have typed a wrong city name.\n Try again', elem);
          break;
        }
      }
    });
}

function request (url) {
  return fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.status);
    });
}

function loading (type, hint, elem) {
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const loadingPage = document.querySelector('.loading-page');
  const loadingIcon = document.querySelector('.loading-page__loading-icon');
  const body = document.body;
  const elemName = elem.dataset.name;

  if (elemName !== 'loading-search') {
    return;
  }
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
      elem.inProcess = false;
      break;
    }
    case 'error': {
      hint.classList.remove('hidden');
      loadingIcon.classList.add('hidden');
      break;
    }
  }
}

function hintUpdate (hintElem, text, elem) {
  let colorChanged = false;
  const questionIcon = hintElem.querySelector('.fa-question-circle');
  const previousText = hintElem.innerHTML;
  const hintText = hintElem.lastElementChild;
  const updateTime = 7000;
  const colorChangeTime = 400;
  const iconChangeTimer = setInterval(() => {
    questionIcon.style.color = colorChanged ? 'white' : 'red';
    colorChanged = !colorChanged;
  }, colorChangeTime);

  hintText.innerHTML = text;
  setTimeout(() => {
    hintElem.innerHTML = previousText;
    questionIcon.style.color = 'white';
    colorChanged = false;
    clearInterval(iconChangeTimer);
    elem.inProcess = false;
  }, updateTime);
}
