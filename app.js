const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./router/user');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json());

// Use the routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
