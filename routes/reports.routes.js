const express = require('express');
const authMiddleware=require('../middlewares/auth.middleware')
const reportsController = require('../controllers/reports.controller');

const router = express.Router();

router.get('/sales',authMiddleware.authAdmin , reportsController.getSalesReports);

module.exports = router;
