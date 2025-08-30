const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('../config');

const router = express.Router();

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpires });
}

// Register by role
router.post('/register/:role', async (req, res) => {
  try {
    const { role } = req.params;
    const { name, email, password } = req.body;

    // allowed roles using old naming style
    if (!["admin", "doctor", "patient", "reception"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ message: `${role} registered successfully`, id: user._id });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Login by role
router.post('/login/:role', async (req, res) => {
  const { email, password } = req.body;
  const { role } = req.params;

  try {
    const user = await User.findOne({ email, role });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true }).json({
      token,
      user: { id: user._id, name: user.name, role: user.role, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ ok: true });
});

module.exports = router;
