function updateWeatherApp(response) {
  let cityElement = document.querySelector("#weather-app-city");
  let countryElement = document.querySelector("#weather-app-country");
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let conditionElement = document.querySelector("#weather-app-condition");
  let humidityElement = document.querySelector("#weather-app-humidity");
  let windElement = document.querySelector("#weather-app-wind");
  let timeElement = document.querySelector("#weather-app-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-app-icon");

  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img class="weather-app-icon" src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}"/>`;
}

function formatDate(date) {
  let dayNumber = date.getDay();
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayElement = dayNames[dayNumber];
  let hourElement = date.getHours();
  let minutesElement = date.getMinutes();
  if (minutesElement < 10) {
    minutesElement = `0${minutesElement}`;
  }
  return `${dayElement} ${hourElement}:${minutesElement}`;
}

function searchCity(city) {
  let apiKey = "f9a47eo48c7db6t0bcbfca0c176bd333";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(updateWeatherApp);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Barcelona");
