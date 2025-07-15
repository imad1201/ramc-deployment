const db = require('../config/db');

const getAllAttendance = (callback) => {
    db.query('SELECT attendances.*, employees.name AS employee_name FROM attendances JOIN employees ON attendances.emp_id = employees.id', callback);
};

const checkIn = (attendance, callback) => {
    db.query('INSERT INTO attendances (emp_id, date, check_in) VALUES (?, CURDATE(), CURTIME()) ON DUPLICATE KEY UPDATE check_in = CURTIME()', [attendance.emp_id], callback);
};

const checkOut = (attendance, callback) => {
    db.query('UPDATE attendances SET check_out = CURTIME(), total_hours = TIMESTAMPDIFF(MINUTE, check_in, CURTIME())/60 WHERE emp_id = ? AND date = CURDATE()', [attendance.emp_id], callback);
};

module.exports = { getAllAttendance, checkIn, checkOut };
