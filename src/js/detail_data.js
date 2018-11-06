let daysContainerData = [];

export function createDetailData (elem) {
  const data = elem.data;
  const firstElemDate = data[0].timestamp_local;
  let day = [data[0]];
  let previousDate = +firstElemDate.slice(8,10);

  daysContainerData = [];
  for (let i = 1; i < data.length; i++) {
    const elemDate = data[i].timestamp_local;
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
}

export function fillDetailData (index) {
  const values = ['Time', 'Weather', 'Temperature', 'Pressure', 'Humidity', 'Wind'];
  const time = ['', ...fixTimezoneHours()];
  const table = document.querySelector('.detail-weather');
  const tbody = createTable(values, time);
  const timeCells = tbody.rows[0].cells;

  table.innerHTML = '';

  for (let i = 1; i < timeCells.length; i++) {
    const hours = timeCells[i].textContent.slice(0, 2);
    const dayLength = daysContainerData[index].length;

    for (let j = 0; j < dayLength; j++) {
      const day = daysContainerData[index];
      const day_hours = day[j].timestamp_local.slice(11, 13);

      if (day_hours === hours) {
        const icon = day[j].weather.icon;
        const temp = day[j].temp;
        const pres = day[j].pres;
        const humidity = day[j].rh;
        const wind = day[j].wind_spd;

        tbody.rows[1].cells[i].innerHTML = `<img src="./images/icons/${icon}.png">`;
        tbody.rows[2].cells[i].innerHTML = Math.round(temp);
        tbody.rows[3].cells[i].innerHTML = Math.round(pres);
        tbody.rows[4].cells[i].innerHTML = Math.round(humidity);
        tbody.rows[5].cells[i].innerHTML = Math.round(wind);
      }
    }
  }
  table.append(tbody);
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

function fixTimezoneHours () {
  const hours = [];
  const firstDayInfo = daysContainerData[1];

  for (let i = 0; i < firstDayInfo.length; i++) {
    const hour = firstDayInfo[i].timestamp_local.slice(11, 13);
    hours.push(hour);
  }
  hours.sort((a, b) => a - b);
  return hours.map(value => `${value}:00`);
}

export function getTimezone () {
  const firstDayTime = daysContainerData[1][0];
  const localTime = parseInt(firstDayTime.timestamp_local.slice(11, 13));
  const utcTime = parseInt(firstDayTime.timestamp_utc.slice(11, 13));

  return localTime - utcTime;
}
