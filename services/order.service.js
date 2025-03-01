const orderModel=require('../models/order.model')

module.exports = {
    createOrder: async (orderData) => {
        return await orderModel.create(orderData);
    },

    getUserOrders: async (userId) => {
        return await orderModel.find({ user: userId }).populate('products.productId');
    }
};