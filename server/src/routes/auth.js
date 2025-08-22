const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const router = express.Router();

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpires });
}

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ id: user._id });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken(user);
  res.cookie('token', token, { httpOnly: true }).json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ ok: true });
});

module.exports = router;
