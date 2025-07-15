const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, attendanceController.getAttendance);
router.post('/checkin', authenticateToken, attendanceController.checkIn);
router.post('/checkout', authenticateToken, attendanceController.checkOut);

module.exports = router;
