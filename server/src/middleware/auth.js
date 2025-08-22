const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
exports.protect = async function(req, res, next) {
  try {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
