const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const poolPromise = require('../db/config');

require('dotenv').config();

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await poolPromise;

    const result = await pool.request()
      .input('id', uuidv4())
      .input('username', username)
      .input('password', hashedPassword)
      .query('INSERT INTO Users (ID,UserName, Password) VALUES (@id, @username, @password)');

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error registering user' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('username', username)
      .query('SELECT * FROM Users WHERE UserName = @username');

    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.Id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.send({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error logging in' });
  }
});

module.exports = router;
