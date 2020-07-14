// b6b56eed9f46a16b4db9e2c3ec998738

const api = {
  key: "b6b56eed9f46a16b4db9e2c3ec998738",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    // console.log(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults)
    .catch((noCity) => {
      alert(`Come on Man!! There is no city named ${query}`);
    });
}

let now = new Date();
let hours = now.getHours();
if (hours > 20) {
  document.body.style.backgroundImage = "url('night-road.jpg')";
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerText = `${Math.floor(weather.main.temp)} °c`;

  let desc = document.querySelector(".current .weather");
  desc.innerText = `${weather.weather[0].description}`;

  let hiLow = document.querySelector(".current .hi-low");
  hiLow.innerText = `${Math.floor(weather.main.temp_min)}°c / ${Math.floor(
    weather.main.temp_max
  )}°c`;

  let wind = document.querySelector(".wind-speed");
  wind.innerText = `Wind speed: ${weather.wind.speed}km/h`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
