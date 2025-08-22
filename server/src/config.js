require('dotenv').config();
module.exports = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/hms',
  jwtSecret: process.env.JWT_SECRET || 'change_me',
  jwtExpires: process.env.JWT_EXPIRES || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  cookieSecure: String(process.env.COOKIE_SECURE) === 'true',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};
