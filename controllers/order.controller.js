const { validationResult } = require('express-validator');
const orderService = require('../services/order.service');

module.exports.placeOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { products, totalAmount } = req.body;

    try {
        const order = await orderService.createOrder({
            user: req.user._id, 
            products,
            totalAmount
        });

        res.status(201).json({
            message: 'Order placed successfully',
            order
        });

    } catch (error) {
        console.error('Place Order Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports.getUserOrders = async (req, res) => {
    try {
        const orders = await orderService.getUserOrders(req.user._id);
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Get Orders Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
