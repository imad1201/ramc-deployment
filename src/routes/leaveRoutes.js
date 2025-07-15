// backend/routes/leaveRoutes.js

const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController'); // Importing the leave controller

// Define the route and handler
router.get('/', leaveController.getLeaveRequests);  // Ensure the handler function is correct

module.exports = router;
