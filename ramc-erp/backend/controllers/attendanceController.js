const Attendance = require('../models/attendanceModel');

exports.getAttendance = (req, res) => {
    Attendance.getAllAttendance((err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
};

exports.checkIn = (req, res) => {
    const { emp_id } = req.body;
    Attendance.checkIn({ emp_id }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Check-in recorded' });
        }
    });
};

exports.checkOut = (req, res) => {
    const { emp_id } = req.body;
    Attendance.checkOut({ emp_id }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Check-out recorded with total hours updated' });
        }
    });
};
