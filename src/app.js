let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let dateSpan = document.querySelector("#date-display");
dateSpan.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastDisplay = document.querySelector("#forecast-days");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-day">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="weather-icon"
                id="icon"
                width="40px"
              />
              <div class="weather-forcast-temperature">
                <span class="forecast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="forecast-temperature-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>`;
      forecastHTML = forecastHTML + `</div>`;
    }
  });
  forecastDisplay.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "eeb543959b96f2d364dd7eaa645a931c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCityForm(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function getForecast(coordinates) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon");
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCityForm);

search("New York");
