const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware=require('../middlewares/auth.middlewares')

router.post('/place', authMiddleware.authUser, [
    body('products').isArray({ min: 1 }).withMessage('At least one product is required'),
    body('products.*.productId').isMongoId().withMessage('Invalid product ID'),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('totalAmount').isNumeric().withMessage('Total amount is required')
], orderController.placeOrder);

router.get('/', authMiddleware.authUser, orderController.getUserOrders);

module.exports = router;
