const { validationResult } = require('express-validator');
const adminModel = require('../models/admin.model');
const adminService=require('../services/admin.service')
module.exports.registerAdmin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, secretKey, phone } = req.body;
        const isAdminAlready = await adminModel.findOne({ email });

        if (isAdminAlready) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        if(secretKey!=process.env.ADMIN_SECRET_KEY){
            return res.status(400).json({ message: 'invalid email or secrete key' });
        }
       
        const admin = await adminService.createAdmin({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            secretKey:secretKey,
            email,
            phone,
            
        });
        const token = admin.generateAuthToken();
        res.cookie('token', token);
        res.status(201).json({ token, admin });

    } catch (error) {
        console.error("Error in registerUser:", error.message);  // Log for debugging
        res.status(500).json({ message: "Internal Server Error", error: error.message });  // Clean error response
    }
};

module.exports.loginAdmin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, secretKey } = req.body;

    
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        
        if (secretKey !==process.env.ADMIN_SECRET_KEY) {
            return res.status(401).json({ message: 'Invalid secret key' });
        }

        
        const token = admin.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ admin, token });

    } catch (error) {
        console.error('Admin Login Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
