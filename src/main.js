import './styles.scss';
import {getData} from './js/get_data.js';
import {fillDetailData} from './js/detail_data.js';

const mainSearch = document.querySelector('.location__search');
const daysContainer = document.querySelector('.days-container');
const loadingPage = document.querySelector('.loading-page');
const loadingSearch = loadingPage.querySelector('.loading-page__search');

mainSearch.inProcess = false;
loadingSearch.inProcess = false;
loadingPage.style.top = `${window.innerHeight / 2 - loadingPage.clientHeight / 1.8}px`;
daysContainer.addEventListener('click', onClickDays);
mainSearch.addEventListener('submit', onSubmitForm);
loadingSearch.addEventListener('submit', onSubmitForm);

function onClickDays (event) {
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
}

function onSubmitForm (event) {
  const object = new FormData(event.target);
  const city = object.get('city-name');
  const elem = this.dataset.name;
  const hint = getHint(elem);

  if (!this.inProcess){
    this.inProcess = true;
    getData(city, hint, this);
  }
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
