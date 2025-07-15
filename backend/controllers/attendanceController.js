// backend/controllers/attendanceController.js
const db = require('../config/db');

// Get all attendance records
const getAllAttendance = (req, res) => {
  db.query('SELECT * FROM attendance', (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};

// Create a new attendance record
const createAttendance = (req, res) => {
  const { employee_id, date, status } = req.body;
  db.query(
    'INSERT INTO attendance (employee_id, date, status) VALUES (?, ?, ?)',
    [employee_id, date, status],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Attendance recorded successfully' });
    }
  );
};

module.exports = { getAllAttendance, createAttendance };
