const daysContainerData = [];


export function createDetailData (elem) {

  const data = elem.data;
  const firstElemDate = data[0].datetime;
  let day = [data[0]];
  let previousDate = +firstElemDate.slice(8,10);

  for (let i = 1; i < data.length; i++) {
    const elemDate = data[i].datetime;
    const date = +elemDate.slice(8,10);

    if (i < data.length - 1) {
      if (date === previousDate) {
        day.push(data[i]);
      } else {
        daysContainerData.push(day);
        day = [data[i]];
        previousDate = date;
      }
    } else {
      daysContainerData.push(day);
    }
  }

  fillDetailData(0);
}



export function fillDetailData (index) {
  const table = document.querySelector('.detail-weather');
  const timeCells = table.rows[0].cells;
  const rowsLength = table.rows.length;
  const cellsLength = table.rows[1].cells.length;

  for (let i = 1; i < rowsLength; i++) {
    for (let j = 1; j < cellsLength; j++) {
      table.rows[i].cells[j].innerHTML = '';
    }
  }

  for (let i = 1; i < timeCells.length; i++) {
    const hours = timeCells[i].textContent.slice(0, 2);
    const dayLength = daysContainerData[index].length;

    for (let j = 0; j < dayLength; j++) {
      const day = daysContainerData[index];
      const day_hours = day[j].datetime.slice(11);

      if (day_hours === hours) {
        const icon = day[j].weather.icon;
        const temp = day[j].temp;
        const pres = day[j].pres;
        const humidity = day[j].rh;
        const wind = day[j].wind_spd;

        table.rows[1].cells[i].innerHTML = `<img src="./images/icons/${icon}.png">`;
        table.rows[2].cells[i].innerHTML = Math.round(temp);
        table.rows[3].cells[i].innerHTML = Math.round(pres);
        table.rows[4].cells[i].innerHTML = Math.round(humidity);
        table.rows[5].cells[i].innerHTML = Math.round(wind);
      }
    }
  }
}
