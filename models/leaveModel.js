const db = require('../config/db');  // Adjust if the db connection path is different

// Get all leave requests
const getAllLeaveRequests = (callback) => {
    db.query('SELECT * FROM leave_requests', callback);
};

// Create a new leave request
const createLeaveRequest = (leave, callback) => {
    db.query('INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, status, reason) VALUES (?, ?, ?, ?, ?, ?)', 
        [leave.employee_id, leave.leave_type, leave.start_date, leave.end_date, leave.status, leave.reason], callback);
};

// Get leave request by ID
const getLeaveRequestById = (leaveId, callback) => {
    db.query('SELECT * FROM leave_requests WHERE id = ?', [leaveId], callback);
};

module.exports = { getAllLeaveRequests, createLeaveRequest, getLeaveRequestById };
