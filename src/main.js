import './styles.scss';
import {getData} from './js/get_data.js';
import {fillDetailData} from './js/detail_data.js';

const mainSearch = document.querySelector('.search-bar');
const loadingSearch = document.querySelector('.loading-page__search');
const daysContainer = document.querySelector('.days-container');

daysContainer.addEventListener('click', event => {
  let {target} = event;
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

mainSearch.addEventListener('submit', onSubmitForm);
loadingSearch.addEventListener('submit', onSubmitForm);

function onSubmitForm (event) {
  const object = new FormData(event.target);
  const city = object.get('city-name');
  const elem = this.dataset.name;
  const hint = getHint(elem);

  getData(city, hint, elem);
  event.preventDefault();
  this.reset();
}

function getHint (elem) {
  switch (elem) {
    case 'main-search': return document.querySelector('.hint');
    case 'loading-search': return document.querySelector('.loading-page__hint');
  }
  return false;
}
