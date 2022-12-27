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

function citySearch(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let cityNameSearch = document.querySelector("#city-input");

  cityName.innerHTML = cityNameSearch.value;
}
let newCity = document.querySelector("#city-search");
newCity.addEventListener("submit", citySearch);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = 25;
}
function convertToCelcius(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = 32;
}
let fahrenheitValue = document.querySelector("#fahrenheit-value");
fahrenheitValue.addEventListener("click", convertToFahrenheit);

let celciusValue = document.querySelector("#celcius-value");
celciusValue.addEventListener("click", convertToCelcius);

//API Challenge

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
}
let city = "Ibadan";
let apiKey = "76041d9a817d8a03463272c365662edd";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=76041d9a817d8a03463272c365662edd&units=metric`;
axios.get(apiUrl).then(showTemperature);
function searchCity(city) {}

function citySearchForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showLocation(position) {
  let apiKey = "76041d9a817d8a03463272c365662edd";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
  axios.get(apiUrlLocation).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);
