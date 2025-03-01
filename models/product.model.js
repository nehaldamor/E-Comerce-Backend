const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    description: { 
        type: String 
    },
    price: { 
        type: Number, required: true 
    },
    category: {
         type: String, required: true
         },
    stock: {
         type: Number, default: 0 
        },
    createdAt: { 
        type: Date, default: Date.now
     }
});

const productModel=mongoose.model('product', productSchema);
module.exports = productModel
