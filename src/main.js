import './styles.scss';
import {getData} from './js/get_data.js';
import {fillDetailData} from './js/detail_data.js';

const daysContainer = document.querySelector('.days-container');
const loadingPage = document.querySelector('.loading-page');
const loadingSearch = {
  obj: loadingPage.querySelector('.loading-page__search'),
  hint: document.querySelector('.loading-page__hint'),
  inProcess: false
} ;
const mainSearch = {
  obj: document.querySelector('.location__search'),
  hint: document.querySelector('.hint'),
  inProcess: false
};

loadingPage.style.top = `${window.innerHeight / 2 - loadingPage.clientHeight / 1.8}px`;
daysContainer.addEventListener('click', onClickDays);

mainSearch.obj.addEventListener('submit', function (event) {
  const object = new FormData(event.target);
  const city = object.get('city-name');

  if (!mainSearch.inProcess){
    mainSearch.inProcess = true;
    getData(city, mainSearch);
  }
  event.preventDefault();
  this.reset();
});

loadingSearch.obj.addEventListener('submit', function (event) {
  const object = new FormData(event.target);
  const city = object.get('city-name');

  if (!loadingSearch.inProcess){
    loadingSearch.inProcess = true;
    getData(city, loadingSearch);
  }
  event.preventDefault();
  this.reset();
});

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

