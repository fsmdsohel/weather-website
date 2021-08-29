// api = 'api.openweathermap.org/data/2.5/weather?q=bogra&units=metric&appid=a771a88d4f683951b388a56c2e844adc'

// icon = http://openweathermap.org/img/wn/10n@2x.png

const loadData = async (search) => {
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a771a88d4f683951b388a56c2e844adc`
  );
  const data = await weatherData.json();
  return data;
};

const searchInput = () => {
  const searchInput = document.getElementById("search-input");
  const search = searchInput.value;
  searchInput.value = "";
  return search;
};

const DisplayWeatherData = (data) => {
  // display weather location
  let country;
  if (data.sys.country == "BD") {
    country = "Bangladesh";
  } else {
    country = data.sys.country;
  }
  document.getElementById(
    "search-location"
  ).innerText = `${data.name}, ${country}`;

  // weather icon
  document.getElementById(
    "weather-icon"
  ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  //   display temperature
  document.getElementById("temperature").innerText = `${data.main.temp}°`;
};

document.getElementById("search-input").onfocus = () => {
  window.onkeypress = async (e) => {
    if (e.key == "Enter") {
      const search = searchInput();
      const weatherData = await loadData(search);
      DisplayWeatherData(weatherData);
    }
  };
};

document.getElementById("search-btn").onclick = async () => {
  const search = searchInput();
  const weatherData = await loadData(search);
  DisplayWeatherData(weatherData);
};

// display dinamic time
setInterval(() => {
  const date = new Date();
  let amPm = "AM";
  if (date.getHours >= 12) {
    amPm = "PM";
  }
  document.getElementById(
    "time"
  ).innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}${amPm}`;
}, 1000);
