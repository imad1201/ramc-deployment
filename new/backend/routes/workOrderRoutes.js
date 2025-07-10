const express = require('express');
const router = express.Router();
const WorkOrderController = require('../controllers/workOrderController');

router.post('/createWO', WorkOrderController.createWorkOrder);
router.get('/woList', WorkOrderController.getAllWorkOrders);

module.exports = router;
