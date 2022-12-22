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
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let dateSpan = document.querySelector("span");
dateSpan.innerHTML = `${day} ${month} ${date}, ${hours} : ${minutes}, ${year}`;

// challenge 2
function citySearch(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let cityNameSearch = document.querySelector("#city-input");

  cityName.innerHTML = cityNameSearch.value;
}
let newCity = document.querySelector("#city-search");
newCity.addEventListener("submit", citySearch);

// challenge 3

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
function searchCity(event) {
  event.preventDefault();
  let apiKey = "76041d9a817d8a03463272c365662edd";
  let city = document.querySelector("#city-input").value;
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(
    "#temperature-value"
  ).innerHTML = `Math.round(response.data.main.temp)℃`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function showLocation() {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "76041d9a817d8a03463272c365662edd";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
}

navigator.geolocation.getCurrentLocation(showLocation);
let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);
