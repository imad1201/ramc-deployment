// backend/routes/payrollRoutes.js

const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController'); // Ensure the payroll controller exists

// Define the route and handler for GET method to fetch payrolls
router.get('/', payrollController.getPayrolls);

// Optionally, add POST method to create payroll if necessary
router.post('/', payrollController.createPayroll);

module.exports = router;
