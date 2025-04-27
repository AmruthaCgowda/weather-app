const weatherIconsMap = new Map([
  ['clear', './images/clear.png'],
  ['clouds', './images/clouds.png'],
  ['drizzle', './images/drizzle.png'],
  ['haze', './images/haze.png'],
  ['humidity', './images/humidity.png'],
  ['mist', './images/mist.png'],
  ['rain', './images/rain.png'],
  ['snow', './images/snow.png'],
  ['wind', './images/wind.png'],
]);

const apiKey = '46d47581a51a79782741111953e700af';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const errorDiv = document.getElementById('error');
const weatherDiv = document.getElementById('weather');
const weatherIcon = document.getElementById('weatherIcon');
const tempEl = document.getElementById('temp');
const cityEl = document.getElementById('city');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();

    cityEl.textContent = data.name;
    tempEl.textContent = Math.round(data.main.temp) + '°C';
    humidityEl.textContent = data.main.humidity + '%';
    windEl.textContent = data.wind.speed + ' km/h';

    const weatherMain = data.weather[0]?.main?.toLowerCase();
    weatherIcon.src = weatherIconsMap.get(weatherMain) || './images/clear.png';

    weatherDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
  } catch (error) {
    errorDiv.classList.remove('hidden');
    weatherDiv.classList.add('hidden');
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    checkWeather(city);
  }
});
