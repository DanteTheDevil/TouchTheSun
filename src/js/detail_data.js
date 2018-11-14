let daysContainerData = [];

export function createDetailData (elem) {
  const data = elem.data;
  const firstElemDate = data[0].timestamp_local;
  let dayArray = [data[0]];
  let previousDate = parseInt(firstElemDate.slice(8,10), 10);

  daysContainerData = [];

  for (let i = 1; i < data.length; i++) {
    const elemFullDate = data[i].timestamp_local;
    const date = parseInt(elemFullDate.slice(8,10), 10);

    if (i < data.length - 1) {
      if (date === previousDate) {
        dayArray.push(data[i]);
      } else {
        daysContainerData.push(dayArray);
        dayArray = [data[i]];
        previousDate = date;
      }
    } else {
      daysContainerData.push(dayArray);
    }
  }
}

export function fillDetailData (index) {
  const values = [
    '<i class="far fa-clock"></i>',
    '<i class="fas fa-info"></i>',
    '<i class="fas fa-thermometer-empty"></i>',
    '<i class="fas fa-compress"></i>',
    '<i class="fas fa-tint"></i>',
    '<i class="fas fa-wind"></i>'
  ];
  const time = ['', ...fixTimezoneHours(daysContainerData[1])];
  const table = document.querySelector('.detail-weather');
  const tBody = createTable(values, time);
  const timeCells = tBody.rows[0].cells;

  table.innerHTML = '';

  for (let i = 1; i < timeCells.length; i++) {
    const tableHours = timeCells[i].textContent.slice(0, 2);
    const args = [i, tableHours, tBody, index];

    fillTable(args);
  }
  table.append(tBody);
}

function fillTable (args) {
  const [index, tableHours, tBody, dayId] = args;
  const dayLength = daysContainerData[dayId].length;

  for (let j = 0; j < dayLength; j++) {
    const day = daysContainerData[dayId];
    const dayHours = day[j].timestamp_local.slice(11, 13);

    if (dayHours === tableHours) {
      const icon = day[j].weather.icon;
      const data = [
        null,
        null,
        day[j].temp,
        day[j].pres,
        day[j].rh,
        day[j].wind_spd
      ];

      for (let k = 1; k < tBody.rows.length; k++) {
        if (k === 1) {
          tBody.rows[k].cells[index].innerHTML = `<img src="./images/icons/${icon}.png">`;
        } else {
          tBody.rows[k].cells[index].innerHTML = Math.round(data[k]);
        }
      }
    }
  }
}

function createTable (values, time) {
  const tbody = document.createElement('tbody');

  for (let i = 0; i < values.length; i++) {
    const row = tbody.insertRow(i);

    for (let j = 0; j < time.length; j++) {
      const cell = row.insertCell(j);

      if (i === 0 && j > 0) {
        cell.innerHTML = time[j];
      } else if (j === 0) {
        cell.innerHTML = values[i];
      } else if (i === 1) {
        cell.innerHTML = '<img src="./images/icons/no_data.png">';
      }
    }
  }
  return tbody;
}

export function fixTimezoneHours (firstDayElemenets) {

  return firstDayElemenets
    .map(value => value.timestamp_local.slice(11, 13))
    .sort((a, b) => a - b)
    .map(value => `${value}:00`);
}

