const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserService = require('../service/UserService');
const auth = require('../utils/auth');
require('dotenv').config()

// Signup route
router.post('/signup', async (req, res) => {
  try {
    // Check if user already exists
    let existingUser = await UserService.findUser(req.body);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that mobile number or email.' });
    }
    // Create new user
    await UserService.createUser(req.body);
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Find user by mobile number
  let {password} = req.body
    let user = await UserService.findUser(req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    console.log(user)
    // Check password
    const isMatch = await UserService.comparePassword(user.password,password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
