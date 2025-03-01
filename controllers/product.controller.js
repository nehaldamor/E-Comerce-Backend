const productService = require('../services/product.service');
const { validationResult } = require('express-validator');
module.exports.addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = await productService.addProduct(req.body);
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error("Add Product Error:", error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports.getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.status(200).json({ products });
    } catch (error) {
        console.error("Get Products Error:", error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const product = await productService.updateProduct(id, req.body);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error("Update Product Error:", error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports.deleteProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Delete Product Error:", error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};




module.exports.getProductById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error('Get Product error:', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};
