const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/admin.controler');

const router = express.Router();

router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('phone').isLength({min:10}).withMessage("phone must 10 digits long"),
    body("secretKey").isLength({min:6}).withMessage("secreteKey must 6ch long")
],
    adminController.registerAdmin
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('secretKey').isLength({ min: 6 }).withMessage('SecretKey must be at least 6 characters long')
],
    adminController.loginAdmin
)

module.exports = router;
