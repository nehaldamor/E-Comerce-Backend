const categoryModel = require('../models/category.model');

module.exports = {
    createCategory: async (data) => {
        return await categoryModel.create(data);
    },

    getAllCategories: async () => {
        return await categoryModel.find();
    },

    updateCategory: async (id, data) => {
        return await categoryModel.findByIdAndUpdate(id, data, { new: true });
    },

    deleteCategory: async (id) => {
        return await categoryModel.findByIdAndDelete(id);
    }
};
