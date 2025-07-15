const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, employeeController.getEmployees);
router.post('/', authenticateToken, employeeController.createEmployee);

module.exports = router;
