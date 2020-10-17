// Feature #1
// In your project, display the current date and time using JavaScript: Tuesday 16:00

let currentDate = new Date();
console.log(currentDate);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentDate.getDay()];
let currentHour = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let showDate = document.querySelector("#date-time");
showDate.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

// Feature #2
// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function submitCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#select-city");
  let h1City = document.querySelector("#city-name");
  let h3Country = document.querySelector("#country-name");

  if (changeCity.value == "") {
    alert("Please enter your city!");
  } else {
    h1City.innerHTML = changeCity.value;
    h3Country.innerHTML = null;

    changeTemp(changeCity.value);
  }
}

let city = document.querySelector("form");
city.addEventListener("submit", submitCity);

// Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

// function changeTemperatureFahrenheit(event) {
//   event.preventDefault();

//   let changeH2 = document.querySelector("#temperature");

//   if ((changeFahrenheit = document.querySelector("#fahrenheit-link"))) {
//     changeH2.innerHTML = "95°F";
//     document.querySelector("#celsius-link").style.display = "inline-block";
//     document.querySelector("#fahrenheit-link").style.display = "none";
//   }
// }

// let changeFahrenheit = document.querySelector("#fahrenheit-link");
// changeFahrenheit.addEventListener("click", changeTemperatureFahrenheit);

// function changeTemperatureCelsius(event) {
//   event.preventDefault();
//   let changeH2 = document.querySelector("#temperature");

//   if ((changeCelsius = document.querySelector("#celsius-link"))) {
//     changeH2.innerHTML = "35°C";
//     document.querySelector("#celsius-link").style.display = "none";
//     document.querySelector("#fahrenheit-link").style.display = "inline-block";
//   }
// }

// let changeCelsius = document.querySelector("#celsius-link");
// changeCelsius.addEventListener("click", changeTemperatureCelsius);

// 👨‍🏫Your task
// On your project, when a user searches for a city(example: New York), it should display the name of the city on the result page and the current temperature of the city.

function showTemperature(response) {
  // console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  // console.log(temperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
}

let apiKey = "89c8092fae86c61da5e71acd50a1415f";

function changeTemp(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

  console.log(cityName);

  axios.get(apiUrl).then(showTemperature);
}

// 🙀 Bonus point:
// Add a Current Location button.When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function updateCityAndTemp(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;

  let h1City = document.querySelector("#city-name");
  h1City.innerHTML = cityName;

  let h3Country = document.querySelector("#country-name");
  h3Country.innerHTML = null;
}

function showCurrentLocationTemperature(position) {
  console.log(position);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateCityAndTemp);
}

function showCurrentCoordinates(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocationTemperature);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentCoordinates);
