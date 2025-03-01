const express=require("express");
const {body,param}=require('express-validator')
const router=express.Router();

const categoryController=require('../controllers/category.controller');
const authMiddleware=require('../middlewares/auth.middlewares');

router.post('/add',authMiddleware.authAdmin,[
        body('name').notEmpty().withMessage('Category name is required'),
        body('description').optional().isLength({ max: 500 }).withMessage('Description max 500 chars')
    ],   
    categoryController.addCategory
)

router.get('/list',categoryController.getCategories)

router.put('/update/:id',authMiddleware.authAdmin,[
    param('id').isMongoId().withMessage('Invalid Category ID'),
    body('name').optional().notEmpty().withMessage('Category name cannot be empty'),
    body('description').optional().isLength({ max: 500 }).withMessage('Description max 500 chars')
],
    categoryController.updateCategory
)

router.delete('/delete/:id',authMiddleware.authAdmin,[
    param('id').isMongoId().withMessage('Invalid Category ID')

],
    categoryController.deleteCategory
 )

 module.exports=router;