const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['Admin', 'Supervisor', 'Technician'], default: 'Technician' },
  password: String,
  division: String,
  station: String,
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
