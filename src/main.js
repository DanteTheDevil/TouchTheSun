import './styles.scss';
import {getData} from './js/get_data.js';
import {fillDetailData} from './js/detail_data.js';

const mainSearch = document.querySelector('.search-bar');
const loaingSearch = document.querySelector('.loading-page__search');
const daysContainer = document.querySelector('.days-container');



daysContainer.addEventListener('click', event => {
  let target = event.target;
  const days = document.querySelectorAll('.day-info');

  while (target !== daysContainer) {
    if (target.className === 'day-info') {
      const index = [].indexOf.call(days, target);

      fillDetailData(index);
      break;
    }
    target = target.parentNode;
  }
});

mainSearch.addEventListener('submit', event => {
  const object = new FormData(event.target);
  const city = object.get('city-name');
  const hint = document.querySelector('.hint');

  getData(city, hint);
  event.preventDefault();
});

loaingSearch.addEventListener('submit', event => {
  const object = new FormData(event.target);
  const city = object.get('city-name');
  const hint = document.querySelector('.loading-page__hint');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const header = document.querySelector('header');
  const loadingPage = document.querySelector('.loading-page');

  if (getData(city, hint)) {
    const loadingTime = 5000;

    setTimeout(() => {
      main.className = 'none';
      footer.className = 'none';
      header.className = 'none';
      loadingPage.className = 'hidden';
    }, loadingTime);
  }
  event.preventDefault();
});
