const API_key = "ab266885b1e48b63f60b29e98cadd19c";

const cityInput = document.getElementById("city-input");
const weatherData = document.getElementById("weather-data");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); //prevent refresh
  const cityValue = cityInput.value;
  console.log(cityValue);
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_key}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network Response was not ok");
    }

    const data = await response.json();
    //gets the data from the JSON, and then the information we need is stored inside the main
    //such as the temperature, its shown in the console, inside the main, called temp

    const temperature = Math.round(data.main.temp);

    //the description of the weather is stored inside data, in weather, which is an
    // array, we get the first element in the array, which is the description we need
    const description = data.weather[0].description;

    //the icon of the weather is stored inside data, in array first element of array weather
    const icon = data.weather[0].icon;

    //array to store details of the weather such as, feels like, wind speed, etc.
    //the array is a dynamic array
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherData.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`;
    weatherData.querySelector(
      ".temperature-container"
    ).textContent = `${temperature}°C`;
    weatherData.querySelector(".weather-condition").textContent = description;

    weatherData.querySelector(".details").innerHTML = details
      .map((details) => `<div>${details}</div>`)
      .join("");

    // console.log(data);
  } catch (error) {
    weatherData.querySelector(
      ".icon"
    ).innerHTML = "";
    weatherData.querySelector(
      ".temperature-container"
    ).textContent = "";
    weatherData.querySelector(".weather-condition").textContent = "try again!";

    weatherData.querySelector(".details").innerHTML = "";
  }
}
