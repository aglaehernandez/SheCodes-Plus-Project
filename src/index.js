function updateWeather(response) {
  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#weather-app-temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let humidityElement = document.querySelector("#weather-app-humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#weather-app-wind");
  windElement.innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let apiKey = "f9a47eo48c7db6t0bcbfca0c176bd333";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Barcelona")
