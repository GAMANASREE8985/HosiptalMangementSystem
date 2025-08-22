const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  room: String
}, { timestamps: true });
module.exports = mongoose.model('Doctor', doctorSchema);
