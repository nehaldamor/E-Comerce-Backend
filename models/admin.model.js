const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            minlength: [ 3, 'Last name must be at least 3 characters long' ],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, 'Email must be at least 5 characters long' ],
    },
    phone:{
        type:String,
        required:true,
        minlength:[10,'phone must 10 digits long']
    }
})

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
   return token;
}

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;