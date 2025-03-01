const { validationResult } = require('express-validator');
const categoryService = require('../services/category.service');

module.exports.addCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
        const category = await categoryService.createCategory({ name, description });

        res.status(201).json({
            message: 'catagory added',
            category
        });
    } catch (error) {
        console.error('catagory error:', error.message);
        res.status(500).json({
            message: 'error occur',
            error: error.message
        });
    }
};

module.exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();

        res.status(200).json({ categories });
    } catch (error) {
        console.error('category error:', error.message);
        res.status(500).json({
            message: 'error occur',
            error: error.message
        });
    }
};

module.exports.updateCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;    
    const { name, description } = req.body;

    try {
        const category = await categoryService.updateCategory(id, { name, description });

        if (!category) {
            return res.status(404).json({ message: 'not found catagory' });
        }

        res.status(200).json({
            message: 'category updated',
            category
        });
    } catch (error) {
        console.error('update category error:', error.message);
        res.status(500).json({
            message: 'update error occur',
            error: error.message
        });
    }
};

module.exports.deleteCategory = async (req, res) => {
    const { id } = req.params; 

    try {
        const category = await categoryService.deleteCategory(id);

        if (!category) {
            return res.status(404).json({ message: 'not found ' });
        }

        res.status(200).json({
            message: 'category deleted'
        });
    } catch (error) {
        console.error('delete catogory error:', error.message);
        res.status(500).json({
            message: 'server error',
            error: error.message
        });
    }
};
