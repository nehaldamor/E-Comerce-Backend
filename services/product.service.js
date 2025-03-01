const productModel = require('../models/product.model');

module.exports = {
    addProduct: async (data) => {
        const product = await productModel.create(data);
        return product;
    },

    getProducts: async () => {
        const products = await productModel.find();
        return products;
    },

    updateProduct: async (id, data) => {
        const product = await productModel.findByIdAndUpdate(id, data, { new: true });
        return product;
    },

    deleteProduct: async (id) => {
        const product = await productModel.findByIdAndDelete(id);
        return product;
    },

    getProductById:async (id) => {
        return await productModel.findById(id);
    }
    
};
