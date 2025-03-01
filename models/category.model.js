const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, required: true, unique: true 
    },
    description: { 
        type: String 
    },
    createdAt: {
         type: Date, default: Date.now 
        }
});
const categoryModel=mongoose.model('category',categorySchema)

module.exports = categoryModel;
