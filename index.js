function search_country() {
  let input = document.getElementById('searchbar').value
  input = input.toLowerCase();
  let x = document.getElementsByClassName('data');

  for (i = 0; i < x.length; i++) {
    if (!x[i].childNodes[1].textContent.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    }
    else {
      x[i].style.display = "inline-block";
    }
  }
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

document.getElementById('getData').addEventListener('click', getData);

function getData() {
  fetch('https://corona.lmao.ninja/all')
    .then((response) => response.json())
    .then((data) => {
      // console.log(data['cases'])
      let output = '<h3 class= "head"> Total Cases:<br> ' + formatNumber(data['cases']) + '</h3>';
      output += ' <h3 class= "head"> Total Deaths:<br> ' + formatNumber(data['deaths']) + '</h3>';
      output += ' <h3 class= "head"> Total Recovered:<br> ' + formatNumber(data['recovered']) + '</h3>';
      document.getElementById('main').innerHTML = output;
    });

  // <li>Active: ${formatNumber(country.active)}</li>

  fetch('https://corona.lmao.ninja/countries')
    .then((response) => response.json())
    .then((countries) => {
      let output = '';
      output += '<ul>';
      countries.forEach(function (country) {
        output += `
              <li class = "data">
                <b>${country.country}</b>
                  <ul>
                    <li>Number of Cases: ${formatNumber(country.cases)}</li>
                    <li>Cases Today: ${formatNumber(country.todayCases)}</li>
                    <li class= "deaths">Total Deaths: ${formatNumber(country.deaths)}</li>
                    <li class = "deaths">Deaths Today: ${formatNumber(country.todayDeaths)}</li>
                    <li class= "deaths">Critical: ${formatNumber(country.critical)}</li>
                    <li>Recovered: ${formatNumber(country.recovered)}</li>
                  </ul>
              </li>
      `;
      });
      output += '</ul>';
      document.getElementById('response').innerHTML = output;
    });

}

getData();
