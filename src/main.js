import './styles.scss';
import {getData} from './js/get_data.js';
import {fillDetailData} from './js/detail_data.js';
//import './js/loading_page.js';

const searchBar = document.querySelector('.search-bar');
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

searchBar.addEventListener('submit', event => {
  const object = new FormData(event.target);
  const city = object.get('city-name');

  getData(city);
  event.preventDefault();
});


