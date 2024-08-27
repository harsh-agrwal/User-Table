const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bytive-assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create a new user
app.post('/api/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Update an existing user
app.put('/api/users/:id', async (req, res) => {
  console.log('edit', req.body, req.params);
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  console.log('req.params', req.params);
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
