const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: { type: String, enum: ['Male','Female','Other'] },
  phone: String,
  address: String,
  history: String,
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
}, { timestamps: true });
module.exports = mongoose.model('Patient', patientSchema);
