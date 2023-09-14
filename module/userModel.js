const User = require('./userModel');
const getWeatherData = require('../weatherAPI');

async function createUserWithWeatherData() {
  try {
    const newUser = new User({
      email: 'user@example.com',
      location: 'Galle', 
    });

    
    const weatherData = await getWeatherData(newUser.location);

    
    newUser.weatherData = {
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
    };

    await newUser.save();

    console.log('User with weather data saved successfully.');
  } catch (error) {
    console.error(error);
  }
}

createUserWithWeatherData();
