// Script to add data into our db from the givem api.

const mongoose = require('mongoose');
const axios = require('axios');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/bytive-assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const populateDatabase = async () => {
  try {
    // Fetching data from the JSONPlaceholder API
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;

    // Inserting data into the MongoDB collection
    await User.insertMany(users);
    console.log('Database populated successfully with user data!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

populateDatabase();