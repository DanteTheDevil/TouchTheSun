const modal = document.createElement('div');
modal.style.cssText = 'display: flex;' +
  'justify-content: center;' +
  'align-items: center;' +
  'flex-direction: column;' +
  'width: 800px;' +
  'height: 400px;' +
  'background-color: rgba(52, 52, 52, 0.31);';

const searchForm = document.createElement('form');
//const searchBar = document.createElement('input');
searchForm.className = 'search-bar';


document.body.prepend(modal);
