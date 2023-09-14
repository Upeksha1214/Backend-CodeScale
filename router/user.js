const express = require('express');
const router = express.Router();
const User = require('./userModel');
const getWeatherData = require('./weatherAPI');

// Route to store user details
router.post('/users', async (req, res) => {
  try {
    const { email, location } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = new User({ email, location });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update user location
router.put('/users/:id/location', async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    // Find the user by ID and update their location
    const user = await User.findByIdAndUpdate(id, { location }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User location updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to retrieve user weather data for a given day
router.get('/users/:id/weather', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch weather data for the user's location
    const weatherData = await getWeatherData(user.location);

    res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
