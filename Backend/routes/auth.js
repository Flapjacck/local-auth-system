const express = require('express');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const db = require('../db');

const router = express.Router();

// Stricter rate limiter for login attempts (5 attempts per 15 minutes)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Less strict rate limiter for signup attempts (10 attempts per 15 minutes)
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 signup requests per windowMs
  message: 'Too many signup attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /signup
router.post('/signup', signupLimiter, async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashed], function(err) {
    if (err) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    return res.status(201).json({ message: 'Signup successful' });
  });
});

// POST /login
router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

module.exports = router;