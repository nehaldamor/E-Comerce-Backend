const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller')
const {body,param}=require('express-validator');
const productController=require('../controllers/product.controller')
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address.city').isLength({min:3}).withMessage('city must 3ch long'),
    body('address.state').isLength({min:3}).withMessage('state must 3 ch long'),
    body('phone').isLength({min:10}).withMessage("phone must 10 digits long"),
],
       userController.registerUser 
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)



module.exports=router