const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  woNumber: String,
  taskNumber: String,
  description: String,
  skillRequired: String,
  estimatedHours: Number,
  sequence: Number,
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
});

module.exports = mongoose.model('Task', taskSchema);
