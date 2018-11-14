import {fillDetailData, createDetailData} from './detail_data.js';
import {fillForecastData} from './forecast_data';
import {fillCurrentData} from './current_data';

export function getData (city, element) {
  const daily_forecast = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
  const curr_forecast = 'https://api.weatherbit.io/v2.0/current?city=';
  const detail_forecast = 'https://api.weatherbit.io/v2.0/forecast/3hourly?city=';
  const api_id = '92e13964b3354f2e95d5972b30cbd727';
  const elemName = element.obj.dataset.name;
  let url = `${detail_forecast}${city}&key=${api_id}`;

  if (elemName === 'loading-search') {
    loading('start', element);
  }
  request(url)
    .then(response => {
      createDetailData(response);
      for (let i = 0; i < 5; i++) fillDetailData(i); // need to get all weather icons cache from days array for Service Worker
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
      fillCurrentData(response);
      if (elemName === 'loading-search') {
        loading('success', element);
      }
      element.inProcess = false;
    })
    .catch(error => {
      const errorCode = parseInt(error.message, 10);

      if (elemName === 'loading-search') {
        loading('error', element);
      }
      switch (errorCode) {
        case 204: return hintUpdate(element, 'You have typed a wrong city name.\n Try again');
        case 400: return hintUpdate(element, 'Line is empty. Type city name');
        default: return element.inProcess = false;
      }
    });
}

export function request (url) {
  return fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.status);
    });
}

function loading (type, element) {
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const loadingPage = document.querySelector('.loading-page');
  const loadingIcon = document.querySelector('.loading-page__loading-icon');
  const body = document.body;

  switch (type) {
    case 'start': {
      element.hint.classList.add('hidden');
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
      element.hint.classList.remove('hidden');
      loadingIcon.classList.add('hidden');
      break;
    }
  }
}

function hintUpdate (element, text) {
  let colorChanged = false;
  const questionIcon = element.hint.querySelector('.fa-question-circle');
  const previousText = element.hint.innerHTML;
  const hintText = element.hint.lastElementChild;
  const updateTime = 6000;
  const colorChangeTime = 400;
  const iconChangeTimer = setInterval(() => {
    questionIcon.style.color = colorChanged ? 'white' : 'red';
    colorChanged = !colorChanged;
  }, colorChangeTime);

  hintText.innerHTML = text;
  setTimeout(() => {
    element.hint.innerHTML = previousText;
    questionIcon.style.color = 'white';
    colorChanged = false;
    clearInterval(iconChangeTimer);
    element.inProcess = false;
  }, updateTime);
}
