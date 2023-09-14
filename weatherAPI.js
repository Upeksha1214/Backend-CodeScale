const axios = require('axios');

const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeatherData(location) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        q: location,
        appid: apiKey,
        units: 'metric', // You can change the units to 'imperial' or 'standard' as per your preference.
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch weather data');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = getWeatherData;
