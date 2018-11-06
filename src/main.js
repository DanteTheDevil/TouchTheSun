import './styles.scss';
import {getData} from './js/get_data.js';
import {fillDetailData} from './js/detail_data.js';

const mainSearch = document.querySelector('.search-bar');
const loadingSearch = document.querySelector('.loading-page__search');
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

mainSearch.addEventListener('submit', function () {
  const object = new FormData(event.target);
  const city = object.get('city-name');
  const hint = document.querySelector('.hint');
  const elem = this.dataset.name;

  getData(city, hint, elem);
  event.preventDefault();
  this.reset();
});

loadingSearch.addEventListener('submit', function () {
  const object = new FormData(event.target);
  const city = object.get('city-name');
  const hint = document.querySelector('.loading-page__hint');
  const elem = this.dataset.name;

  getData(city, hint, elem);
  event.preventDefault();
  this.reset();
});


