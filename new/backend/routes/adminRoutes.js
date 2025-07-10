const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.post('/createUser', AdminController.createUser);
router.get('/users', AdminController.getAllUsers);

module.exports = router;
