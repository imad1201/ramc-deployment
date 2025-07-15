const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, payrollController.getPayrolls);
router.post('/', authenticateToken, payrollController.createPayroll);

module.exports = router;
