// Function to fetch weather data from Yr API
async function fetchWeather() {
    const latitude = 60.5987; //Hosanger
    const longitude = 5.5223; //Hosanger
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'YourAppName/1.0 (yourname@example.com)'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to map symbol_code to weather icon
function getWeatherIcon(symbol_code) {
    const iconMapping = {
        "clearsky_day": "☀️",
        "clearsky_night": "🌕",
        "partlycloudy_day": "⛅",
        "partlycloudy_night": "☁️",
        "cloudy": "☁️",
        "rain": "🌧️",
        "lightrain": "🌦️",
        "heavyrain": "🌧️",
        "snow": "❄️",
        "lightsnow": "🌨️",
        "heavysnow": "❄️",
        "fog": "🌫️",
        "sleet": "🌧️",
        "thunderstorm": "⛈️"
    };
    return iconMapping[symbol_code] || "❓"; 
}

// Function to display weather data
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    const temperature = data.properties.timeseries[0].data.instant.details.air_temperature;
    const windSpeed = data.properties.timeseries[0].data.instant.details.wind_speed;
    const symbolCode = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;
    const weatherIcon = getWeatherIcon(symbolCode);

    weatherDiv.innerHTML = `
        <p class="temp">Temperature: ${temperature}°C</p>
        <p class="wind">Wind Speed: ${windSpeed} m/s</p>
        <p class="condition">Condition: ${weatherIcon}</p>
    `;
}

window.onload = fetchWeather; 
