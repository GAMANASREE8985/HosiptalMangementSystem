const mongoose = require('mongoose');
const { connectDB } = require('./db');
const User = require('./models/User');
const Doctor = require('./models/Doctor');

(async function(){
  await connectDB();
  const adminEmail = 'admin@hms.local';
  const exists = await User.findOne({ email: adminEmail });
  if (!exists) {
    await User.create({ name: 'Admin', email: adminEmail, password: 'Admin@123', role: 'admin' });
    console.log('Seed: admin created');
  }
  const docCount = await Doctor.countDocuments();
  if (docCount === 0) {
    await Doctor.insertMany([
      { name: 'Dr. Asha Rao', specialization: 'Cardiology', email: 'asha@hms.local', phone: '9999990001', room: 'C1' },
      { name: 'Dr. Vivek Patel', specialization: 'Orthopedics', email: 'vivek@hms.local', phone: '9999990002', room: 'O2' }
    ]);
    console.log('Seed: doctors added');
  }
  process.exit(0);
})();
