// backend/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// GET all attendance records
router.get('/', attendanceController.getAllAttendance);

// POST to create an attendance record
router.post('/', attendanceController.createAttendance);

module.exports = router;
