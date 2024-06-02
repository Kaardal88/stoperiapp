  // Function to fetch weather data from Yr API
  async function fetchWeather() {
    const latitude = 60.5987; // Example latitude for Oslo, Norway
    const longitude = 5.5223; // Example longitude for Oslo, Norway
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

// Function to display weather data
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <p>Temperature: ${data.properties.timeseries[0].data.instant.details.air_temperature}°C</p>
        <p>Wind Speed: ${data.properties.timeseries[0].data.instant.details.wind_speed} m/s</p>
        <p>Condition: ${data.properties.timeseries[0].data.next_1_hours.summary.symbol_code}</p>
    `;
}

// Fetch weather data when the page loads
window.onload = fetchWeather;