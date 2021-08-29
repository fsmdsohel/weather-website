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
  if (search == "") {
    document.getElementById(
      "search-input"
    ).placeholder = `Please type your city name`;
    document.getElementById("search-input").classList.add("error");
  } else {
    document.getElementById("search-input").placeholder = `Type your city name`;
    document.getElementById("search-input").classList.remove("error");
    return search;
  }
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
  document.getElementById("temperature").innerText = `${Math.round(
    data.main.temp
  )}°`;

  document.getElementById("weather-detail").innerText =
    data.weather[0].description;

  document.getElementById("teaperature-feels-like").innerText = `${Math.round(
    data.main.feels_like
  )}°`;

  document.getElementById("wind-speed").innerText = data.wind.speed;

  document.getElementById("humidity").innerText = `${data.main.humidity}%`;

  document.getElementById("visibility").innerText = `${data.visibility} m`;

  document.getElementById("pressure").innerText = `${data.main.pressure} mb`;
};

document.getElementById("search-input").onfocus = () => {
  window.onkeypress = async (e) => {
    if (e.key == "Enter") {
      const search = searchInput();
      if (search) {
        const weatherData = await loadData(search);
        DisplayWeatherData(weatherData);
      }
    }
  };
};

document.getElementById("search-btn").onclick = async () => {
  const search = searchInput();
  if (search) {
    const weatherData = await loadData(search);
    DisplayWeatherData(weatherData);
  }
};

// display dinamic time
setInterval(() => {
  const date = new Date();
  let amPm = "AM";
  if (date.getHours >= 12) {
    amPm = "PM";
  }
  var hours = date.getHours();
  hours = hours % 12 || 12;
  document.getElementById(
    "time"
  ).innerText = `${hours}:${date.getMinutes()}:${date.getSeconds()} ${amPm}`;
}, 1000);
