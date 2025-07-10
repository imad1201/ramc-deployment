const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  woNumber: String,
  aircraftReg: String,
  station: String,
  scheduledStart: Date,
  scheduledEnd: Date,
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('WorkOrder', workOrderSchema);
