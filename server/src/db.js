const mongoose = require('mongoose');
const config = require('./config');
async function connectDB() {
  await mongoose.connect(config.mongoUri, { });
  console.log('Mongo connected');
}
module.exports = { connectDB };
